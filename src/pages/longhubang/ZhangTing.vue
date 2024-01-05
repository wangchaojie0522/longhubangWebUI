<template>
    <div class="homePageBox">
        <div class="searchBox">
            <a-form layout="inline" :model="formState">
                <a-form-item>
                    <a-date-picker v-model:value="formState.date" @change="onDateChange" format="YYYYMMDD" value-format="YYYYMMDD" />
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" @click="queryData">
                        查询
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
        <div class="dataBox">
            <a-table :dataSource="dataSource" :columns="columns" :pagination="false"  size="small">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'action'">
                        <a-button type="link" @click="onInfo(record)" style="margin-rigth: 20px">K线图</a-button>
                    </template>
                </template>
            </a-table>
        </div>
        <a-modal v-model:visible="infoVis" width="80vw" title="K线图">
           <div>
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
import { Etf_API, EtfRL_API, GupiaoKInfo_API,LHBZT_API } from '@/server/homepage'
import { message,notification , Modal , FormProps} from 'ant-design-vue';
import 'ant-design-vue/es/message/style/css'
import {Message} from '@/common/message'
import KInfoItem from '../baseDataAll/KInfoItem.vue'
import moment from 'moment'
interface FormState {
    date: string;
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
    code: string;
}
export default defineComponent({
    components: {
        UserOutlined,
        LockOutlined,
        KInfoItem,
    },
    setup() {
        const formState: UnwrapRef<FormState> = reactive({
            date: '',
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
                title: '代码',
                dataIndex: 'code',
                key: 'code',
            },
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '涨跌幅',
                dataIndex: 'change',
                key: 'change',
            },
            {
                title: '最新价',
                dataIndex: 'close',
                key: 'close',
            },
            {
                title: '换手率',
                dataIndex: 'TR',
                key: 'TR',
            },
            {
                title: '成交额(百万)',
                dataIndex: 'TV',
                key: 'TV',
            },
            {
                title: '流通市值(百万)',
                dataIndex: 'CMV',
                key: 'CMV',
            },
            {
                title: '总市值(百万)',
                dataIndex: 'TMV',
                key: 'TMV',
            },
            {
                title: '封板资金(百万)',
                dataIndex: 'CBF',
                key: 'CBF',
            },
            {
                title: '首次封板时间',
                dataIndex: 'FST',
                key: 'FST',
            },
            {
                title: '最后封板时间',
                dataIndex: 'LST',
                key: 'LST',
            },
            {
                title: '炸板次数',
                dataIndex: 'NFC',
                key: 'NFC',
            },
            {
                title: '连板数',
                dataIndex: 'NCB',
                key: 'NCB',
            },
            {
                title: '涨停统计',
                dataIndex: 'LUC',
                key: 'LUC',
            },
            {
                title: '所属行业',
                dataIndex: 'industry',
                key: 'industry',
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
            },
        ])
       
        const queryData = () => {
            totals.value = 0
            LHBZT_API.Get({date: formState.date}).then((res: any) => {
                if(res.code==200){
                    dataSource.value = res.data
                    totals.value = res.count
                }
            })
        }
        const onDateChange = () => {
            queryData()
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
            let newCode = ''
            if(record.code.startsWith('00') || record.code.startsWith('30')) {
                newCode = record.code + '.SZ'
            } else if(record.code.startsWith('60') || record.code.startsWith('68')) {
                newCode = record.code + '.SH'
            } else if(record.code.startsWith('8')){
                newCode = record.code + '.BJ'
            }else {
                newCode = record.code
            }
            let endDate = moment(new Date()).format('YYYYMMDD');
            let startDate = moment(new Date()).subtract(60,'days').format('YYYYMMDD');
            GupiaoKInfo_API.Get({tscode: newCode, start_date: startDate, end_date: endDate}).then((res: any) => {
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
                    KInfoItem.value?.onChange(activeKId.value.name, record.name + '('+ record.code +')', arrN)
                }
                
            })
        }
       
        // 更新数据库
        onMounted(() => {
            queryData()
        })
        return {
            formState,
            queryData,
            dataSource,
            columns,
            totals,
            formState1,
            showTotal,
            onInfo,
            infoVis,
            KInfoItem,
            KInfoData,
            klist,
            activeKId,
            onChangeK,
            activeItem,
            onDateChange,
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