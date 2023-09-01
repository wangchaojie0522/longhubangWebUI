<template>
    <div class="homePageBox">
        <div class="searchBox">
            <a-form layout="inline" :model="formState">
                <a-form-item>
                    <a-input v-model:value="formState.tscode" @change="onTextChange" placeholder="基金代码">
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" @click="queryData">
                        查询
                    </a-button>
                </a-form-item>
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
                        <a-button type="link" danger @click="onDelete(record)">删除</a-button>
                    </template>
                </template>
            </a-table>
            <a-pagination class="paginationBox" v-model:current="formState.pageNum" show-quick-jumper :total="totals" @change="onChange" :pageSizeOptions="['10', '20', '50', '100']"  :show-total="showTotal"/>
        </div>
        <a-modal v-model:visible="infoVis" width="80vw" title="K线图">
           <div>
            <div class="kListBox">
                <!-- <span :class="{'kitem':true,'kitemActive': item.id == activeKId.id}" v-for="item in klist" :key="item.id" @click="onChangeK(item)">{{item.name}}</span> -->
            </div>
            <KInfoItem  ref="KInfoItem"  style="height: 70vh"  />
           </div>
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
import { Etf_API, EtfRL_API, EtfKInfo_API } from '@/server/homepage'
import { message,notification , Modal , FormProps} from 'ant-design-vue';
import 'ant-design-vue/es/message/style/css'
import {Message} from '@/common/message'
import KInfoItem from './KInfoItem.vue'
interface FormState {
    tscode: string;
    pageNum: number;
    pageSize: number;
}
interface FormState1 {
    name: string;
    tscode: string;
    industry: string;
    list_date: string;
    remark: string;
}
interface TableItem {
    name: string;
    tscode: string;
    industry: string;
    list_date: string;
    remark: string;
}
export default defineComponent({
    components: {
        UserOutlined,
        LockOutlined,
        KInfoItem,
    },
    setup() {
        const formState: UnwrapRef<FormState> = reactive({
            tscode: '',
            pageNum: 1,
            pageSize: 10,
        });
        const formState1: UnwrapRef<FormState1> = reactive({
            name: '',
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
                title: '基金简称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '基金代码',
                dataIndex: 'tscode',
                key: 'tscode',
            },
            {
                title: '投资类型',
                dataIndex: 'fund_type',
                key: 'fund_type',
            },
            {
                title: '上市日期',
                dataIndex: 'list_date',
                key: 'list_date',
            },
            {
                title: '面值',
                dataIndex: 'p_value',
                key: 'p_value',
            },
            {
                title: '起点金额(万元)',
                dataIndex: 'issue_amount',
                key: 'issue_amount',
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
            Etf_API.Get({tscode: formState.tscode,pageNum: formState.pageNum, pageSize: formState.pageSize }).then((res: any) => {
                if(res.code==200){
                    dataSource.value = res.data
                    totals.value = res.count
                }
            })
        }
        
        // k线图详情
        const infoVis = ref(false)
        const KInfoItem = ref()
        const KInfoData = ref<(number|string)[][]>([])
        const klist = ref([{name:'日k',id:'d'},{name:'周k',id:'w'},{name:'月k',id:'m'}])
        const activeKId = ref({name:'日k',id:'d'})
        const activeItem = ref<TableItem>()
        const onChangeK = (record: {name:string,id:string}) => {
            activeKId.value = record
            if(activeItem.value) {
                onInfo(activeItem.value)
            }
        }
        const onInfo = (record:TableItem) => {
            infoVis.value = true
            activeItem.value = record
            EtfKInfo_API.Get({tscode: record.tscode, start_date: '', end_date:''}).then((res: any) => {
                if(res.code ==200) {
                    let arr = res.data
                    let arrN:(number|string)[][] = []
                    arr.forEach((item: {trade_date:string,open:number,high:number,low:number,close:number,vol:number}) => {
                        arrN.push([
                            item.trade_date,
                            item.open,
                            item.high,
                            item.low,
                            item.close,
                            item.vol,
                            item.vol > res.volavg ? 1 : -1
                        ])
                    });
                    KInfoData.value = arrN
                    KInfoItem.value?.onChange(activeKId.value.name, record.name + '('+ record.tscode +')', arrN)
                }
                
            })
        }
        const onDelete = (record:TableItem) => {
            Modal.confirm({
                title: '确定要删除该条数据吗?',
                icon: createVNode(ExclamationCircleOutlined),
                onOk() {
                    Etf_API.Delete({tscode: record.tscode}).then((res: any) => {
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
            EtfRL_API.Post().then((res: any) => {
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
            formState1,
            onDelete,
            showTotal,
            onChange,
            onReloadData,
            onloadFlag,
            onInfo,
            infoVis,
            KInfoItem,
            KInfoData,
            klist,
            activeKId,
            onChangeK,
            activeItem,
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
.kListBox {
    display: flex;
    height: 40px;
    line-height: 40px;
    .kitem{
        cursor: pointer;
        width: 60px;
        text-align: center;
    }
    .kitemActive {
        color: blue;
    }
}
</style>