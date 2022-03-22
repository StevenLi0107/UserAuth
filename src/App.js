import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Button, message } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import LoginReducer from "./State/loginReducer";
import { LoginAction, LogoutAction } from "./State/authAction";
import { Routes, Link, Route , useNavigate} from "react-router-dom";
import LeftMenuBar from './Component/LeftMenuBar';
import LoginForm from './Component/LoginForm';
import Home from './Pages/Home';
import PageNotFound from './Component/PageNotFound';
import AddHeroSlider from './Pages/AddHeroSlider';
import HomePageSetting from './Pages/HomePageSetting';
import ContactPageSetting from "./Pages/ContactPageSetting";
import AboutPageSetting from './Pages/AboutPageSetting';
import BlogPageSetting from "./Pages/BlogPageSetting"
import PageBanner from './Pages/PageBanner';
import FooterPageSetting from './Pages/FooterPageSetting';
import MenuBarSetting from './Pages/MenuBarSetting';
import PortfolioSetting from './Pages/PortfolioSetting';

function App() {
  const { Header, Footer, Sider, Content } = Layout;
  const [login, setLogin] = useState();
  const dispatch = useDispatch();
  const navigate =useNavigate();


  const ReceiveData = useSelector(state => ({ ...state.LoginReducer }));
  useEffect(() => {
    setLogin(ReceiveData.isLogin)
    console.log("hello revolution ", login);
  }, [login, ReceiveData])


  return (
    <>
      {login ? <div>
        <Layout>

        <Header style={{ color: "white" , display:"flex",justifyContent:"space-between", alignItems:"center"}}>Revolution -soft -Admin
              <Button
                onClick={() => {
                  dispatch(LogoutAction());
                  navigate("/");
                  message.success("Logout successful")
                }}>Logout</Button>
            </Header>

          <Layout>
          

          <Sider style={{ backgroundColor: "#001529" }}>
            <LeftMenuBar />
          </Sider>

            <Content>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path = "/add-hero-slider" element={<AddHeroSlider/>} />
                <Route path = "/home-page-setting" element={<HomePageSetting/>} />
                <Route path = "/contact-page-setting" element={<ContactPageSetting/>} />
                <Route path = "/about-page-setting" element={<AboutPageSetting/>} />
                <Route path = "/blog-page-setting" element={<BlogPageSetting/>} />
                <Route path = "/page-banner" element={<PageBanner/>} />
                <Route path = "/footer-setting" element={<FooterPageSetting/>} />
                <Route path = "/menu-setting" element={<MenuBarSetting/>} />
                <Route path = "/portfolio-setting" element={<PortfolioSetting/>} />







                {/* <Route path="*" element={<PageNotFound />} /> */}

            



              </Routes>

            </Content>
            
          </Layout>
          <Footer style={{ color: "white", backgroundColor: "#001529" ,textAlign:"center"}}>Footer</Footer>
        </Layout>
      </div> : <div><LoginForm /></div>}
    </>
  );
}

export default App;
