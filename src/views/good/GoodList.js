import {
  Table,
  Tag,
  Space,
  Row,
  Col,
  Input,
  Button,
  Select
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import action from '@/store/actions'
import img from '@/utils/img'
import './style.scss'
import moment from 'moment'
import CateSelect from './components/CateSelect'

const {Option} = Select

export default props => {

  const dispatch = useDispatch()
  const goodData = useSelector(store=>store.good.goodData)
  const cates = useSelector(store=>store.good.cates)
  // console.log('cates',cates)

  let [text, setText] = useState('')
  let [filter, setFilter] = useState({
    size:2,
    page:1,
    text:'',
    hot:''
  })

  const textChange = val =>{
    setText(val)
    if(!val) {
      filter.text = ''
      setFilter(JSON.parse(JSON.stringify(filter)))
    }
  }
  const filterChange = (key,val) => {
    filter[key] = val
    if(key!=='page') filter.page = 1
    // 要做深复制才能起作用
    setFilter(JSON.parse(JSON.stringify(filter)))
  }

  useEffect(()=>{
    dispatch(action.getGoodList(filter))
    return undefined
  }, [filter])

  const columns = [
    {
      title: '商品',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text,row,idx) => {
        return (
          <div className='gl-good'>
            <img src={img.imgBase+row.img} alt={row.name} />
            <a>{text}</a>
          </div>
        )
      },
    },
    {
      title:'商品品类',
      dataIndex:'cate',
      key:'cate',
      align:'center',
      render:cate=>{
        const idx = cates.findIndex(ele=>ele.cate===cate)
        return <span>{cates[idx].cate_zh}</span>
      }
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
      key: 'desc',
      align: 'center',
      render: text=><div className='table-desc'>{text}</div>
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      sorter: (a, b) => a.price - b.price,
      render: text=> <div>{'￥'+text}</div>
    },
    {
      title: '是否热销',
      dataIndex: 'hot',
      key: 'hot',
      align: 'center',
      render: text=> <div>{text?'是':'否'}</div>
    },
    {
      title: '上架时间',
      dataIndex: 'create_time',
      key: 'create_time',
      align: 'center',
      render: text=> {
        return(
          <>
            <div>{moment(text).format('YYYY年MM月DD日')}</div>
            <div>{moment(text).format('hh:mm:ss')}</div>
          </>
        )
      }
    },
    {
      title: '操作',
      key: 'tags',
      align: 'center',
      dataIndex: 'tags',
      render: () => (
        <>
          <a href="">删除</a>
          <a href="">编辑</a>
        </>
      )
    }
  ]

  return (
    <div className='qf-good-list'>
      <h1>商品列表</h1>
      <hr/>
      <div style={{margin: '25px 0'}}>
        {/* 第一行 */}
        <Row align='middle'>
          <Col span={2}>
            <span className='filter-label'>名称搜索:</span>
          </Col>
          <Col span={6}>
            <Input 
              value={text} 
              onChange={e=>textChange(e.target.value)} 
              placeholder="搜索" 
              allowClear
              onPressEnter={e=>filterChange('text',e.target.value)}
            />
          </Col>
          <Col span={2}>
            <span className='filter-label'>品类筛选:</span>
          </Col>
          <Col span={6}>
            <CateSelect 
              hasAll
              onChange={cate=>filterChange('cate',cate)}
              allowClear 
            />
          </Col>
          <Col span={2}>
            <span className='filter-label'>是否热销:</span>
          </Col>
          <Col span={4}>
            <Select 
              onChange={val=>filterChange('hot',val)}
              style={{width:'80px'}} 
              allowClear
            >
              <Option key='1' value=''>全部</Option>
              <Option key='2' value={true}>是</Option>
              <Option key='3' value={false}>否</Option>
            </Select>
          </Col>
          <Col  span={2} style={{textAlign: 'right'}}>
            <Button
              size='small'
              type="primary"
              onClick={()=>props.history.push('/good/update/0')}
            >
              +新增
            </Button>
          </Col>
        </Row>
      </div>
      <div style={{margin: '20px 0'}}>
        <Table
          rowKey='_id'
          columns={columns}
          dataSource={goodData.list}
          pagination={{
            current:filter.page,
            total: goodData.total,
            defaultPageSize: filter.size,
            onChange: page=>filterChange('page',page),
            onShowSizeChange: (page, size)=>filterChange('size',size),
            pageSizeOptions: [2,5,10,15,20],
            showSizeChanger:true
          }}
        />
      </div>
    </div>
  )
}
