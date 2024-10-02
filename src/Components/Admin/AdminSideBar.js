import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

import images from "../../assets/images";
import { FaGem } from "react-icons/fa";
import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";
import styles from "./AdminSideBar.module.scss";

const cx = classNames.bind(styles);

const AdminSideBar = (props) => {
  const navigate = useNavigate();
  const { collapsed, toggled, handleToggleSidebar } = props;
  return (
    <>
      <ProSidebar
        image={images.bg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
            //   textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <DiReact size={"3em"} color={"00bfff"} />
            <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              Sale Management
            </span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<MdDashboard />}>
              Dashboard
              <Link to="/admins" />
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu icon={<FaGem />} title="Features">
              <MenuItem>
                Quản lý người dùng
                <Link to="/admins/manage-users" />
              </MenuItem>
              <MenuItem>
                Quản lý Banner
                <Link to="/admins/manage-quizzes" />
              </MenuItem>
              <MenuItem>
                {" "}
                Quản lý danh mục
                <Link to="/admins/manage-questions" />
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className={cx('sidebar-btn-wrapper')}
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://sinhvien.huce.edu.vn/dashboard.html"
              target="_blank"
              className={cx('sidebar-btn')}
              rel="noopener noreferrer"
            >
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                &#169; hvd75
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default AdminSideBar;
