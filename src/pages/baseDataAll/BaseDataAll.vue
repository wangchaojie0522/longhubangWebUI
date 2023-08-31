<template>
    <div class="homePageBox">
        <div class="searchBox">
            <a-form layout="inline" :model="formState">
                <a-form-item>
                    <a-input v-model:value="formState.symbol" @change="onTextChange" placeholder="股票代码">
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" @click="queryData">
                        查询
                    </a-button>
                </a-form-item>
                <!-- <a-form-item>
                    <a-button type="primary" @click="onAdd">
                        新增
                    </a-button>
                </a-form-item> -->
               <a-form-item>
                    <a-button type="primary" @click="onReloadData" :loading="onloadFlag">
                        更新数据库
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
        <div class="dataBox">
            <a-table :dataSource="dataSource" :columns="columns" :pagination="false"  size="small">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'action'">
                        <a-button type="link" @click="onInfo(record)" style="margin-rigth: 20px">K线图</a-button>
                        <a-button type="link" @click="onEdit(record)" style="margin-rigth: 20px">编辑</a-button>
                        <a-button type="link" danger @click="onDelete(record)">删除</a-button>
                    </template>
                </template>
            </a-table>
            <a-pagination class="paginationBox" v-model:current="formState.pageNum" show-quick-jumper :total="totals" @change="onChange" :pageSizeOptions="['10', '20', '50', '100']"  :show-total="showTotal"/>
        </div>
        <a-modal v-model:visible="visible" :title="addFlag?'新增':'修改'">
            <a-form :model="formState1" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }" >
                <a-form-item label="股票名称">
                    <a-input v-model:value="formState1.name" readonly/>
                </a-form-item> 
                <a-form-item label="股票代码">
                    <a-input readonly v-model:value="formState1.symbol" />
                </a-form-item> 
               
                <a-form-item label="上市日期">
                <a-input v-model:value="formState1.list_date" readonly type="textarea" />
                </a-form-item>
                <a-form-item label="所属行业">
                    <a-input v-model:value="formState1.industry" />
                </a-form-item>
                <a-form-item label="备注">
                <a-input v-model:value="formState1.remark" type="textarea" />
                </a-form-item>
            </a-form>
            <template #footer>
                <a-button @click="handleCancel">取消</a-button>
                <a-button type="primary" @click="handleOk">保存</a-button>
            </template>
        </a-modal>
        <a-modal v-model:visible="infoVis" title="K线图">
           
            <template #footer>
                <a-button >上一页</a-button>
                <a-button type="primary" >上一条</a-button>
                <a-button >下一条</a-button>
                <a-button type="primary" >下一页</a-button>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { UserOutlined, LockOutlined, ExclamationCircleOutlined} from '@ant-design/icons-vue';
import { defineComponent, reactive, onMounted, ref,createVNode } from 'vue';
import type { UnwrapRef } from 'vue';
import { Gupiao_API, GupiaoRL_API } from '@/server/homepage'
import { message,notification , Modal , FormProps} from 'ant-design-vue';
import 'ant-design-vue/es/message/style/css'
import {Message} from '@/common/message'
interface FormState {
    symbol: string;
    pageNum: number;
    pageSize: number;
}
interface FormState1 {
    name: string;
    symbol: string;
    tscode: string;
    industry: string;
    list_date: string;
    remark: string;
}
interface TableItem {
    name: string;
    symbol: string;
    tscode: string;
    industry: string;
    list_date: string;
    remark: string;
}
export default defineComponent({
    components: {
        UserOutlined,
        LockOutlined,
    },
    setup() {
        const formState: UnwrapRef<FormState> = reactive({
            symbol: '',
            pageNum: 1,
            pageSize: 10,
        });
        const formState1: UnwrapRef<FormState1> = reactive({
            name: '',
            symbol: '',
            tscode: '',
            industry: '',
            list_date: '',
            remark: '',
        });
        const totals =ref(0)
        const showTotal = ref((total: any) => `共 ${total} 条`)
        const dataSource = ref([
            
        ])
        const columns = ref([
            {
                title: '股票名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '股票代码',
                dataIndex: 'symbol',
                key: 'symbol',
            },
            {
                title: '所属行业',
                dataIndex: 'industry',
                key: 'industry',
            },
            {
                title: '上市日期',
                dataIndex: 'list_date',
                key: 'list_date',
            },
            {
                title: '备注',
                dataIndex: 'remark',
                key: 'remark',
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
            },
        ])
        const onChange = (pageNumber: number) => {
            console.log('Page: ', pageNumber);
            formState.pageNum = pageNumber
            queryData()
        };
        const onTextChange = () => {
            formState.pageNum = 1
            queryData()
        }
        const queryData = () => {
            totals.value = 0
            Gupiao_API.Get({symbol: formState.symbol,pageNum: formState.pageNum, pageSize: formState.pageSize }).then((res: any) => {
                if(res.code==200){
                    dataSource.value = res.data
                    totals.value = res.count
                }
            })
        }
        // 新增， 修改
        const addFlag = ref(true)
        const visible = ref(false)
        const onAdd = () => {
            visible.value = true
        }
        const handleCancel = () => {
            visible.value = false
        }
        const handleOk = () => {
           if(addFlag.value) {
                Gupiao_API.Post(formState1).then((res: any) => {
                    if(res.code ==200) {
                        visible.value = false
                        queryData()
                        Message({
                            type:'success',
                            msg:'添加成功'
                        })
                    }
                    else {
                        Message({
                            type:'error',
                            msg: res.msg
                        })
                    }
                })
           } else {
                Gupiao_API.Put(formState1).then((res: any) => {
                    if(res.code ==200) {
                        visible.value = false
                        queryData()
                        Message({
                            type:'success',
                            msg:'修改成功'
                        })
                    }
                    else {
                        Message({
                            type:'error',
                            msg: res.msg
                        })
                    }
                })
           }
            
        }
        // k线图详情
        const infoVis = ref(false)
        const onInfo = (record:TableItem) => {
            infoVis.value = true
        }
        const onEdit = (record:TableItem) => {
            addFlag.value = false
            visible.value = true
            formState1.tscode =record.tscode
            formState1.name =record.name
            formState1.symbol =record.symbol
            formState1.industry = record.industry
            formState1.list_date = record.list_date
            formState1.remark = record.remark
        }
        const onDelete = (record:TableItem) => {
            Modal.confirm({
                title: '确定要删除该条数据吗?',
                icon: createVNode(ExclamationCircleOutlined),
                onOk() {
                    Gupiao_API.Delete({tscode: record.tscode}).then((res: any) => {
                        if(res.code ==200) {
                            queryData()
                            Message({
                                type:'success',
                                msg:'删除成功'
                            })
                        }
                        else {
                            Message({
                                type:'error',
                                msg: res.msg
                            })
                        }
                    })
                },
                onCancel() {
                    
                },
            });
        }
        // 更新数据库
        const onloadFlag = ref(false)
        const onReloadData = () => {
            onloadFlag.value = true
            GupiaoRL_API.Post().then((res: any) => {
                if(res.code == 200) {
                    onloadFlag.value = false
                    queryData()
                    Message({
                        type:'success',
                        msg:'修改成功'
                    })
                }
                else {
                    onloadFlag.value = false
                    Message({
                        type:'error',
                        msg: res.msg
                    })
                }
            })
        }
        onMounted(() => {
            queryData()
        })
        return {
            formState,
            queryData,
            onTextChange,
            dataSource,
            columns,
            totals,
            addFlag,
            visible,
            handleCancel,
            handleOk,
            onAdd,
            formState1,
            onEdit,
            onDelete,
            showTotal,
            onChange,
            onReloadData,
            onloadFlag,
            onInfo,
            infoVis,
        }
    }
})
</script>
<style scoped lang="scss">
.homePageBox {
    height: 100%;
    overflow: auto;
    padding: 0;
    margin: 0;

    .searchBox {
        padding: 20px
    }

    .dataBox {
        height: calc(100% - 72px)
    }
    .paginationBox {
        padding: 10px 20px;
        text-align: right;
    }
}
</style>