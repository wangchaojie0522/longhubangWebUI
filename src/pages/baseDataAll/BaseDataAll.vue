<template>
    <div class="homePageBox">
        <div class="searchBox">
            <a-form layout="inline" :model="formState">
                <a-form-item>
                    <a-input v-model:value="formState.name" @change="queryData" placeholder="股票代码">
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" @click="queryData">
                        查询
                    </a-button>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" @click="onAdd">
                        新增
                    </a-button>
                </a-form-item>
               <a-form-item>
                    <a-button type="primary" @click="onReloadData">
                        更新数据库
                    </a-button>
                </a-form-item>
                 <!-- <a-form-item>
                    <a-button type="primary">
                        下载模板
                    </a-button>
                </a-form-item> -->
            </a-form>
        </div>
        <div class="dataBox">
            <a-table :dataSource="dataSource" :columns="columns" :pagination="false"  size="small">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'action'">
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
                    <a-input v-model:value="formState1.name" />
                </a-form-item> 
                <a-form-item label="股票代码">
                    <a-input :readonly="!addFlag" v-model:value="formState1.code" />
                </a-form-item> 
                <a-form-item label="所属概念">
                    <a-input v-model:value="formState1.concept" />
                </a-form-item>
                <a-form-item label="主营业务">
                <a-input v-model:value="formState1.business" type="textarea" />
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
    name: string;
    pageNum: number;
    pageSize: number;
}
interface FormState1 {
    name: string;
    code: string;
    concept: string;
    business: string;
    remark: string;
}
interface TableItem {
    name: string;
    code: string;
    concept: string;
    business: string;
    remark: string;
}
export default defineComponent({
    components: {
        UserOutlined,
        LockOutlined,
    },
    setup() {
        const formState: UnwrapRef<FormState> = reactive({
            name: '',
            pageNum: 1,
            pageSize: 10,
        });
        const formState1: UnwrapRef<FormState1> = reactive({
            name: '',
            code: '',
            concept: '',
            business: '',
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
                dataIndex: 'code',
                key: 'code',
            },
            {
                title: '所属概念',
                dataIndex: 'concept',
                key: 'concept',
            },
            {
                title: '主营业务',
                dataIndex: 'business',
                key: 'business',
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
        const queryData = () => {
            totals.value = 0
            Gupiao_API.Get({code: formState.name,pageNum: formState.pageNum, pageSize: formState.pageSize }).then((res: any) => {
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
        const onEdit = (record:TableItem) => {
            addFlag.value = false
            visible.value = true
            formState1.name =record.name
            formState1.code =record.code
            formState1.concept = record.concept
            formState1.business = record.business
            formState1.remark = record.remark
        }
        const onDelete = (record:TableItem) => {
            Modal.confirm({
                title: '确定要删除该条数据吗?',
                icon: createVNode(ExclamationCircleOutlined),
                onOk() {
                    Gupiao_API.Delete({code: record.code}).then((res: any) => {
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
        const onReloadData = () => {
            GupiaoRL_API.Post().then((res: any) => {
                if(res.code ==200) {
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
        onMounted(() => {
            queryData()
        })
        return {
            formState,
            queryData,
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