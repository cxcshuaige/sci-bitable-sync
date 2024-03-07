import React, { useState, useEffect  } from 'react';
import { Form, Row, Col, Input, Button } from 'antd';
import { bitable } from '@base-open/connector-api';
import { useGet, usePost } from "@/utils/http";
import { ruleRequired } from '@ecoding/components.antd.rules';
import { Gutter } from '@/constants/project';

const Home: React.FC = () => {
    const [form] = Form.useForm(); // 该组件内form全局变量
    const saveUse = usePost("/sync/cache"); 
    const getUse = useGet("/sync/cache_get"); 
    const [userId, setUserId] = useState('');
    useEffect(() => {
        bitable.getTenantKey().then(async (id) => {
            setUserId(id);
            const res = await getUse.req({
                userId: id
            });
            if (res) {
                form.setFieldsValue(res);
            }
        });

        //  bitable.getUserId()
        // getUse.req({
        //     userId: "bou_918ab5cf9430f887261d92a7512890a7"
        // }).then((res) => {
        //     if (res) {
        //         form.setFieldsValue(res);
        //     }
        // })
            

        // bitable.getConfig().then(config => {
        //     console.log('srcTablePath client', config);
        //     setValue(config?.value || '');
        // });
        
        // bitable.getTenantKey().then(key => {
        //     setTenantKey(key);
        // })
    }, []);

    const next = async () => {
        const values = await form.validateFields();
        if (userId) {
            await saveUse.req({
                userId,
                data: values
            });
            bitable.saveConfigAndGoNext(values);
        }
    }

    return (
        <Form form={form} preserve={false} layout="vertical">
            <Row gutter={Gutter}>
                <Col span={12}>
                    <Form.Item name="dbUrl" label="数据库地址" rules={[ruleRequired("数据库地址不能为空")]}>
                        <Input placeholder="请输入数据库地址" />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item name="port" label="端口" rules={[ruleRequired("端口不能为空")]}>
                        <Input placeholder="请输入端口" />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item name="username" label="用户名" rules={[ruleRequired("用户名不能为空")]}>
                        <Input placeholder="请输入用户名" />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item name="pwd" label="密码" rules={[ruleRequired("密码不能为空")]}>
                        <Input placeholder="请输入密码" />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item name="dbName" label="数据库名称" rules={[ruleRequired("数据库名称不能为空")]}>
                        <Input placeholder="请输入数据库名称" />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item name="tableName" label="数据表名" rules={[ruleRequired("数据表名不能为空")]}>
                        <Input placeholder="请输入数据表名" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24} className='tac mt10'>
                    <Button size="large" className='w400' onClick={next} type="primary">下一步</Button>
                </Col>
            </Row>
        </Form>
    )
};

export default Home;