import React ,{useState} from "react";
import "./styles.css";
import Leaflet from "./Leaflet";
import Files from "./Files";
import { Layout, Menu,  Button,Card,Drawer} from 'antd';
import Layers from './Layers'
import Search from "./Search";

 const  App = () => {
  const { Header, Content, Sider } = Layout;
  const [visible, setVisible] = useState(false);
  const keys = {
    1 : "Shapefiles",
    2: "Layers" , 
    3 : "Search"
  };
  const [key, setKey] = useState(2) ; 
  const [urls,setUrls] = useState([]);
  const [features,setFeatures] = useState([]);
  const[mapRef,setmapRef]=useState(null) ; 
  const callMapRef = (m) =>{
    setmapRef(m) ; 
  }
  const showDrawer = (e) => {
    setVisible(true);
    setKey(e.key) 
  };
  const onClose = () => {
    setVisible(false);
  };
  const transfUrls=(urls) =>{
    setUrls(urls) ; 
  }
  const callFeatures=(f)=>{
    setFeatures(f) ; 
  }
  return <div>
    <Drawer title={keys[key]} placement="right" onClose={onClose} visible={visible} width={800}>
    <Card>
      {key == 1 && 
      <Files callback={transfUrls} urls={urls}></Files>
      }
      {key == 2 && <Layers features={features}></Layers>}
      {key == 3 && <Search features={features} mapRef={mapRef}></Search>}
      </Card>
      </Drawer>
    <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['{2}']}  onClick={showDrawer}>
        <Menu.Item key="1" >Shapefiles</Menu.Item>
        <Menu.Item key="2">Layers</Menu.Item>
        <Menu.Item key="3">Search </Menu.Item>
      </Menu>
    </Header>
    <Layout>
        <Content
          className="site-layout-background"
          style={{
            padding: 5,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Leaflet urls={urls} features={callFeatures} mapRef={callMapRef}/>
        </Content>
    </Layout>
  </Layout>,


 
  </div> 
 ;
}
 export default App ; 