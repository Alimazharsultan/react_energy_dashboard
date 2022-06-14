import { useEffect, useState } from "react";
import Sidebarr from "../sidebar/Sidebar";
import TopNav from "../topnav/TopNav";
import Pagelinks from "../Pagelinks";
import "./layout.css";
import { BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ThemeAction from "../../redux/actions/ThemeAction";
import AlarmContext from "../../context/alarm-context";
import servers from '../../assets/servers';
import AuthPage from "../../pages/Auth";
function Layout(props) {
  
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  
  function login (token, userId, tokenExpiration, username){
    setToken(token);
    setUserId(userId);
    window.localStorage.setItem('userName', username)
  }
  function logout(){
    setToken(null);
    setUserId(null);
    window.localStorage.removeItem('userName');
  }

  const [notifications, setNotificatoins] = useState([]);
  const [tempUpLimit, setTempUpLimit] = useState(50);
  const [tempLowLimit, setTempLowLimit] = useState(10);
  const [humidityUpLimit, setHumidityUpLimit] = useState(100);
  const [humidityLowLimit, setHumidityLowLimit] = useState(0);
  const [pressureUpLimit, setPressureUpLimit] = useState(1500);
  const [pressureLowLimit, setPressureLowLimit] = useState(10);


  const [temp, setTemp] = useState(25);
  const [humidity, setHumidity] = useState('Na');
  const [pressure, setPressure] = useState('Na');
  const [lum, setLum] = useState('Na');

  const [isLoading, setIsLoading] = useState(false);
  const [sideBarActive, setSideBarActive] = useState(true)

  const themeReducer = useSelector((state) => state.ThemeReducer);
  
  const dispatch = useDispatch();

  useEffect(() => {
    const themeClass = localStorage.getItem("themeMode", "theme-mode-light");

    const colorClass = localStorage.getItem("colorMode", "theme-mode-light");

    dispatch(ThemeAction.setMode(themeClass));

    dispatch(ThemeAction.setColor(colorClass));
    
  }, []);
  
  function sidebarChange(){
    
    setSideBarActive(!sideBarActive);
    if(sideBarActive){
      document.documentElement.style.setProperty('--sidebar-width','50px');
    }else{
      document.documentElement.style.setProperty('--sidebar-width','300px');
    }
  };
  const loggedInUser = true;
  
  return (
   <>
      {loggedInUser && <BrowserRouter>
        <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
        {loggedInUser && <Sidebarr sideBarActive={sideBarActive} />} 
          <div className="layout__content">
          {loggedInUser && <TopNav sideBarActive={sideBarActive} onChange={()=>{sidebarChange()}}/>} 
            
            <div className="layout__content-main">
              <Pagelinks />
            </div>
          </div>
        </div>
      </BrowserRouter>}

      {!loggedInUser && 
      <AuthPage/>
      }
      </>
  );
}
export default Layout;
