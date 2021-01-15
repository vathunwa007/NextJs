import Head from 'next/head'
import DefaultLayout from '../components/Layouts/DefaultLayout'
import { Layout } from 'antd';
import { Table, Button, Modal, Image, Form, Input, InputNumber, } from 'antd';
import { getAllProduct, PostProduct, DeleteProduct, PutProduct, getByIdProduct } from "../services/Product";
import {FormInstance} from 'antd/lib/form'
const { Header, Content } = Layout;
import React,{ useEffect, useState } from "react";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};



const Product = () => {
  const defaulstate = {
    product_name: "",
    product_detail: "",
    product_barcode: "",
    product_price: "",
    product_qty: "",
    product_image: ""
  }
  const [form] = Form.useForm();
  const [data, setdata] = useState([]);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState("add");
  const [formdata, setFormdata] = useState({
    product_name: "",
    product_detail: "",
    product_barcode: "",
    product_price: "",
    product_qty: "",
    product_image: ""
  });

  useEffect(() => {
    getTable();
  }, [])

  const onFinish = (values) => {
    // console.log(values);
    if(mode == "add"){
    PostProduct(values).then(({ data }) => {
      console.log(data);
      form.resetFields();
      getTable();
    }).catch((eror) => {
      console.log(eror);
    })
  }else{
    Update();
  }

  };

  const getTable = () => {
    getAllProduct().then(({ data }) => {
      setdata(data)
    })
  }
  const deletes = (id) => {
    console.log(id);
    const status = confirm("คุณต้องการลบใช่ไหม")
    if(status){
    DeleteProduct(id).then(({ data }) => {
      console.log(data);
      getTable()

    }).catch((eror) => {
      console.log(eror);
    })
  }
  }
  const Update =()=>{
    PutProduct(formdata.id,formdata).then(({data})=>{
      console.log(data);
      getTable();
      form.resetFields();
    }).catch((eror)=>{
      console.log(eror);
    })
  }
  const edit=(row)=>{
    setVisible(true);
    setMode("edit")
    form.setFieldsValue(row);
    setFormdata(row);

  }
  const ChangeValue = (event) => {
    const { name, value } = event.target;
    setFormdata({ ...formdata, [name]: value })
  }
  const columns = [
    {
      title: 'รหัส',
      dataIndex: 'id',
      key: 'id',
      render: (text, row, index) => <a>{index + 1}</a>,
      sorter: (a, b) => a.id - b.id,
      sortOrder: 'ascend'
    },

    {
      title: 'ชื่อสินค้า',
      dataIndex: 'product_name',
      key: 'product_name',
    },

    {
      title: 'รหัสบาร์โค้ด',
      key: 'product_barcode',
      dataIndex: 'product_barcode',

    },
    {
      title: 'ราคา(ต่อหน่วย)',
      key: 'product_price',
      dataIndex: 'product_price',

    },
    {
      title: 'วันที่ขาย',
      key: 'product_date',
      dataIndex: 'product_date',

    },
    {
      title: 'ภาพถ่ายสินค้า',
      key: 'product_image',
      dataIndex: 'product_image',
      render: (text, row) => <Image src={text} alt="" width={100} />,

    },
    {
      title: 'จัดการ',
      key: 'Action',
      dataIndex: 'Action',
      render: (text, row) => <>
        <Button type="primary" onClick={() => edit(row)}>แก้ไข</Button>
        <Button type="primary" danger onClick={() => deletes(row.id)}>ลบ</Button>
      </>,
    },
  ];


  return (
    <DefaultLayout>
      <Head>
        <title>Product</title>
      </Head>

      <Header className="site-layout-background" style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Product</h2>
        <Button type="primary" style={{ marginTop: "20px" }} onClick={() => {setVisible(true);setMode("add");}}>เพิ่ม</Button>
      </Header>

      <Content className="site-layout-background layout-content">
        <Table columns={columns} dataSource={data} sortDirections={['ascend']} rowKey={(k) => k.id} />
      </Content>
      {/*--------------------------------------------------------------------------------------------*/}
      <Modal
        title={<h3>เพิ่มรายการสินค้า</h3>}
        centered
        visible={visible}
        okText={"บันทึก"}
        cancelText={"ยกเลิก"}
        onOk={() => form.submit()}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <Form  form={form} {...layout} name="nest-messages" onFinish={onFinish} initialValues={formdata} >
          <Form.Item
            name={"product_name"}
            label="ชื่อสินค้า	"

          >
            <Input onChange={(e) => ChangeValue(e)} name={"product_name"} />
          </Form.Item>
          <Form.Item
            name={"product_barcode"}
            label="รหัสบาร์โค้ด"

          >
            <Input onChange={(e) => ChangeValue(e)} name={"product_barcode"} />
          </Form.Item>
          <Form.Item
            name={"product_qty"}
            label="ราคา(ต่อหน่วย)	"

          >
            <Input onChange={(e) => ChangeValue(e)} name={"product_qty"} />
          </Form.Item>
          <Form.Item
            name={"product_price"}
            label="จำนวนสินค้า	"

          >
            <Input onChange={(e) => ChangeValue(e)} name={"product_price"} />
          </Form.Item>
          <Form.Item name={"product_image"} label="url รูปภาพ">
            <Input onChange={(e) => ChangeValue(e)} name={"product_image"} />
          </Form.Item>
          <Form.Item name={"product_detail"} label="รายละเอียดสินค้า">
            <Input.TextArea onChange={(e) => ChangeValue(e)} name={"product_detail"} />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>

          </Form.Item>
        </Form>
      </Modal>
    </DefaultLayout>
  )
}

export default Product
