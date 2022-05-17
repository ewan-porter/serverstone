import React from 'react'
import { Select, Typography, Row, Col, Avatar, Card} from 'antd';
import moment from 'moment';

import Newsimage from '../images/Newsimage.jpg';

import { useGetF1NewsQuery } from '../services/f1NewsApi';
import Loader from './Loader';

const {Text, Title} = Typography;




const News = ({simplified}) => {
const { data: f1News } = useGetF1NewsQuery({q: 'Formula-1', count: simplified ? 6 : 12})

if(!f1News?.value) return <Loader/>

  return (
   <Row gutter={[24, 24]}>
     {f1News.value.map((news, i) => (
      <Col xs={24} sm={12} lg={8} key={i}>
        <Card hoverable className='news-card'>
          <a href={news.url} target="_blank" rel="noreferrer">
            <div className="news-image-container">
              <Title className='news-title' level={4}>{news.name}</Title>
              <img style={{maxWidth: '200px', maxHeight: '100px'}} src={news?.image?.thumbnail?.contentUrl || Newsimage} alt="news"></img>
            </div>
            <p>{news.description > 100 ? `${news.description.substring(0, 100)}...` 
            : news.description}</p>
            <div className="provider-container">
              <div>
                <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || Newsimage} />
                <Text className="provider-name">{news.provider[0]?.name}</Text>
              </div>
              <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
            </div>
          </a>
        </Card>
      </Col>
    
     ))}
   </Row>
  )
}

export default News