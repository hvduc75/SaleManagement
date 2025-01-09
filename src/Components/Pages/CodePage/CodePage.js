import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkTokenLogin } from '../../../service/authService';
import { UserLoginSuccess, GetUserInforSuccess } from '../../../redux/action/userAction';
import { getCartId, getListProductsSuccess } from '../../../redux/action/cartAction';
import { getCartByUserId, getProductsByCartId } from '../../../service/cartApiService';
import { getUserInforDefault } from '../../../service/userInforApiService';

function CodePage({setLoading}) {
    const { userId, tokenLogin } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let response = await checkTokenLogin(userId, tokenLogin);
            if (response && +response.EC === 0) {
                dispatch(UserLoginSuccess(response));

                let res = await getCartByUserId(response.DT.id);
                dispatch(getCartId(res));

                let data = await getProductsByCartId(res.DT.id);
                dispatch(getListProductsSuccess(data.DT[0].Products));

                let userInfor = await getUserInforDefault(response.DT.id);
                dispatch(GetUserInforSuccess(userInfor));
                
                if (response.DT.role === 'User') {
                    navigate('/');
                } else {
                    navigate('/admin');
                }
            }
            setLoading(false);
        };
        fetchData();
    }, [setLoading]);
    return <div></div>;
}

export default CodePage;
