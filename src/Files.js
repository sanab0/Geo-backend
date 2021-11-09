import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Button,Card} from 'antd';
import 'antd/dist/antd.css';
import shp from "shpjs";
import { FilePicker } from 'react-file-picker'
import { DownloadOutlined } from '@ant-design/icons';
import { useLeaflet } from "react-leaflet";
const Files = (props) => {
  const { map } = useLeaflet();
    const [urls,setUrls]=useState(props.urls);
    const [info,setInfo] = useState("") ; 

    const deleteUrl = (url) =>{
        let copy = urls.slice() ; 
        copy.splice(urls.indexOf(url),1)
        setUrls(copy)
      }
    const showGeojson =(url)=>{
        shp(require('./shapefiles/'+url)).then(function (data) {
          console.log(data)
            setInfo(data.toString())
        });  
    }
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Status',
          key: 'state',
          dataIndex: 'state',
          render: tags => (
            <>
              {tags.map(tag => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
               <Button type="primary" ghost onClick={()=>{showGeojson(record.name)} }>
          Show Geojson
        </Button>
              <Button type="primary" danger ghost onClick={()=> deleteUrl(record.name)}>
          Delete
        </Button>
            </Space>
          ),
        },
      ];
      useEffect(()=>{ 
        props.callback(urls) ; 
      }); 
      const dataInit =()=>{
           let data =[] ; 
          for (let index = 0; index < urls.length; index++) {
              const element = urls[index];
              data =  [
                  ...data,
                  {
                      key : (index + 1 ).toString() , 
                      name : element,
                      state : ["cool"]
                  }
              ];
          }
          return data ; 
      }
      
      
      return <div >
          <Card>
          <Table columns={columns} dataSource={dataInit()} /> 
          <FilePicker
          size = {10}
          extensions={['zip']}
          onChange={file => {setUrls ( [...urls , file.name]); }}
          onError={errMsg => (console.log(errMsg))}
       >
           <Button type="primary" icon={<DownloadOutlined />} size={100}> Import </Button>

   </FilePicker>
   <p>{info}</p>
          </Card>
          
      </div>;
};

export default Files;