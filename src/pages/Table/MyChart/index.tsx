import {deleteChartUsingPost, listMyChartByPageUsingPost} from '@/services/rico/chartController';

import {useModel} from '@@/exports';
import {Avatar, Button, Card, List, message, Modal, Result, Space} from 'antd';
import ReactECharts from 'echarts-for-react';
import React, {useEffect, useState} from 'react';
import Search from "antd/es/input/Search";
import {DeleteOutlined} from "@ant-design/icons";

/**
 * 我的图表页面
 * @constructor
 */
const MyChartPage: React.FC = () => {
    const initSearchParams = {
        current: 1,
        pageSize: 4,
        sortField: 'createTime',
        sortOrder: 'desc',
    };

    const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({...initSearchParams});
    const {initialState} = useModel('@@initialState');
    const {currentUser} = initialState ?? {};
    const [chartList, setChartList] = useState<API.Chart[]>();
    const [currentChart, setCurrentChart] = useState<API.Chart>();
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [DeleteShow, setDeleteShow] = useState<boolean>(false);

    const showDelete = (chart: API.Chart) => {
        setCurrentChart(chart);
        setDeleteShow(true);
    }
    const loadData = async () => {
        setLoading(true);
        try {
            const res = await listMyChartByPageUsingPost(searchParams);
            if (res.data) {
                setChartList(res.data ?? []);
                setTotal(res.data.total ?? 0);
                // 隐藏图表的 title
                if (res.code === 20000) {
                    res.data.forEach(data => {
                        if (data.status === 'succeed') {
                            const chartOption = JSON.parse(data.genChart ?? '{}');
                            chartOption.title = undefined;
                            console.log(chartOption)
                            data.genChart = JSON.stringify(chartOption);
                        }
                    })
                }
            } else {
                message.error('获取我的图表失败');
            }
        } catch (e: any) {
            message.error('获取我的图表失败，' + e.message);
        }
        setLoading(false);
    };
    const handleDelete = async () => {
        const res = await deleteChartUsingPost({
            id: currentChart?.id
        });
        if (res.code === 20000) {
            message.success('删除成功');
            setDeleteShow(false);
            await loadData();
        } else {
            message.error('删除失败' + res.message);
        }
    }
    useEffect(() => {
        loadData();
    }, [searchParams]);

    return (
        <div className="my-chart-page">
            <div>
                <Search placeholder="请输入图表名称" enterButton loading={loading} onSearch={(value) => {
                    // 设置搜索条件
                    setSearchParams({
                        ...initSearchParams,
                        name: value,
                    })
                }}/>
            </div>
            <div className="margin-16"/>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 1,
                    md: 1,
                    lg: 2,
                    xl: 2,
                    xxl: 2,
                }}
                pagination={{
                    onChange: (page, pageSize) => {
                        setSearchParams({
                            ...searchParams,
                            current: page,
                            pageSize,
                        })
                    },
                    current: searchParams.current,
                    pageSize: searchParams.pageSize,
                    total: total,
                }}
                loading={loading}
                dataSource={chartList}
                renderItem={(item) => (
                    <List.Item key={item.id}>
                        <Card style={{width: '100%'}}>
                            <List.Item.Meta
                                avatar={<Avatar src={currentUser && currentUser.userAvatar}/>}
                                title={<>{item.name} <Button size={"small"}
                                                             onClick={() => showDelete(item)}><DeleteOutlined/></Button></>}
                                description={
                                    item.chartType ? '图表类型：' + item.chartType : undefined
                                }
                            />
                            <>
                                {
                                    item.status === 'wait' && <>
                                        <Result
                                            status="warning"
                                            title="待生成"
                                            subTitle={item.execMessage ?? '当前图表生成队列繁忙，请耐心等候'}
                                        />
                                    </>
                                }
                                {
                                    item.status === 'running' && <>
                                        <Result
                                            status="info"
                                            title="图表生成中"
                                            subTitle={item.execMessage}
                                        />
                                    </>
                                }
                                {
                                    item.status === 'succeed' && <>
                                        <div style={{marginBottom: 16}}/>
                                        <p>{'分析目标：' + item.goal}</p>
                                        <div style={{marginBottom: 16}}/>
                                        <ReactECharts option={item.genChart && JSON.parse(item.genChart)}/>
                                        <p>{'AI 回答：' + item.genResult}</p>
                                    </>
                                }
                                {
                                    item.status === 'failed' && <>
                                        <Result
                                            status="error"
                                            title="图表生成失败"
                                            subTitle={item.execMessage}
                                        />
                                    </>
                                }
                            </>
                        </Card>
                    </List.Item>
                )}
            />
            <Modal open={DeleteShow}
                   footer={(_, {OkBtn, CancelBtn}) => (
                       <>
                           <CancelBtn/>
                           <OkBtn/>
                       </>
                   )}
                   onCancel={() => setDeleteShow(false)}
                   onOk={() => handleDelete()}>
                <Space>
                    <p>确定要删除{currentChart?.name}吗？</p>
                </Space>
            </Modal>
        </div>

    );
};
export default MyChartPage;
