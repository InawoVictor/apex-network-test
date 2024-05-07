<template>
  <div class="">
      <AppHeader />
      <section class="bg-grayBg px-16 py-10">
        <div class="flex items-center justify-between ">
          <BaseTab 
            @update:title="getSelectedTab"
            :tabTitles="['All', 'Paid', 'Unpaid', 'Overdue']"
          />
          <div class="w-[254px]">
            <BaseButton title="Pay Dues" />
          </div>
        </div>
        <div class=" bg-whiteBg rounded-2xl my-9">
          <div class="p-8 w-full flex justify-end" >
            <button class="bg-grayBg p-4 flex items-center gap-4 rounded-xl">
              <img src="/svg/filter.svg" alt="">
              <span class="font-medium text-sm2 text-greenBg">Filter</span>
            </button>
          </div>
          <div class="flex items-center px-8 gap-x-8">
            <BaseInputField 
              v-model="name"
              label="Name"
              placeholder="name"
              type="text"
              class="flex-1"
            />
            <BaseInputField 
              v-model="amount"
              label="Amount"
              placeholder="amount"
              type="text"
              class="flex-1"
            />
            <BaseSelect
              v-model="userStatus"
              label="User's Status"
              placeholder="status"
              type="text"
              class="flex-1"
              :options="userOptions"
            />
            <BaseSelect
              v-model="paymentStatus"
              label="Payment Status"
              :options="paymentOptions"
              placeholder="Payment Status"
              type="text"
              class="flex-1"
            />
          </div>
          <!-- Table -->
          <div class="mt-5" v-if="transactionsData">
            <Table 
              :data="transactionsData.data"
              :headers="headers"
              :links="transactionsData.links"
              :nextPageUrl="transactionsData.next_page_url"
              :prevPageUrl="transactionsData.prev_page_url"
              @update:page="refetchData"
            >
              <template #id="item">
                <div class="text-center">
                  <div class="w-[2rem] h-[2rem] border border-solid border-[#CBD5E0] rounded-full"></div>
                </div>
              </template>
              <template #user="item">
                <div class=" text-sm2 font-semibold">
                  <p>{{ item.user.name }}</p>
                  <p class="font-normal text-[1.5rem] text-[#88888A] mt-2">{{item.user.email}}</p>
                </div>
              </template>
              <template #status="item">
                <div>
                  <div class="flex items-center gap-x-2"
                    :class="
                      item.user.status === 'active' ? `active-tag` :
                      item.user.status === 'inactive' ? 'inactive-tag' : ''
                    "
                  >
                    <div class="w-[6px] h-[6px] rounded-full"
                      :class="item.user.status === 'active' ? 'bg-greenBg' : 'bg-orangeBg' "
                    ></div>
                    <span class="capitalize">{{ item.user.status }}</span>
                  </div>
                  <p class="text-[#383A47] mt-2 text-sm2 text-semibold">
                    Last Login: {{useFormatDateText(item.user.last_login_at)}}
                  </p>
                </div>
              </template>
              <template #paymentStatus="item">
                    <div>
                      <div class="flex items-center gap-x-2"
                        :class="
                          item.payment_made_at ? `paid-tag` :
                          item.payment_expected_at && item.payment_made_at === null && selectedTab !== 'overdue' ? 'unpaid-tag' : 
                          item.payment_expected_at && item.payment_made_at === null && selectedTab === 'overdue'? 'overdue-tag' : ''
                        "
                      >
                        <div class="w-[6px] h-[6px] rounded-full"
                          :class="
                            item.payment_made_at ? 'bg-purpleBg' : 
                            item.payment_expected_at && item.payment_made_at === null && selectedTab !== 'overdue'  ? 'bg-yellowBg' :
                            item.payment_expected_at && item.payment_made_at === null && selectedTab === 'overdue'? 'bg-redBg' : ''
                          "
                        ></div>
                        <span>
                          {{
                            item.payment_made_at ? 'Paid' :
                            item.payment_expected_at && item.payment_made_at === null && selectedTab !== 'overdue'   ? 'Unpaid' : 
                            item.payment_expected_at && item.payment_made_at === null && selectedTab === 'overdue'? 'Overdue' : ''
                          }}
                        </span>
                    </div>
                      <p class="text-[#383A47] text-sm2 mt-2 text-semibold">
                        <span v-if="item.payment_made_at ">Paid on: {{useFormatDateText(item.payment_made_at)}}</span>
                        <span v-if="item.payment_expected_at && item.payment_made_at === null && selectedTab !== 'overdue'  ">Dues on: {{useFormatDateText(item.payment_expected_at)}}</span>
                        <span v-if="item.payment_expected_at && item.payment_made_at === null && selectedTab === 'overdue' ">Dued on: {{useFormatDateText(item.payment_expected_at)}}</span>
                      </p>
                    </div>
                </template>
                <template #amount="item">
                  <div class=" text-sm2 font-semibold">
                    <p>${{ item.amount}}</p>
                    <p class="font-normal text-[1.5rem] mt-2 text-[#88888A]">{{ item.currency}}</p>
                  </div>
                </template>
            </Table>
          </div>
        </div>
      </section>
      <DialogLoader />
  </div>
</template>

<script setup >
import {ref} from 'vue'
import { useToast } from 'vue-toastification';
import {useTransactionsStore} from "./stores/transactions"
import {useDialogStore} from "./stores/dialog"
import { http } from './stores/services';
import useFormatDateText from "./composables/useFormatDateText";
import useCheckDate from "./composables/useCheckDate";

const toast = useToast();
const transactions = useTransactionsStore();
const dialog = useDialogStore();
const name = ref('')
const amount = ref('')
const userStatus = ref('')
const paymentStatus = ref('');
const selectedTab = ref('all');
const transactionsData = ref(null);
const headers = {
  id: "ID",
  user: "User",
  status: "User's Status",
  paymentStatus: "Payment Status",
  amount: "Amount",
  action: "",
}
const userOptions = ref([
  {
    name: "All",
    value: "all"
  },
  {
    name: "Active",
    value: "active"
  },
  {
    name: "Inactive",
    value: "inactive"
  },
]);
const paymentOptions = ref([
  {
    name: "All",
    value: "all"
  },
  {
    name: "Paid",
    value: "paid"
  },
  {
    name: "Unpaid",
    value: "unpaid"
  },
  {
    name: "Overdue",
    value: "overdue"
  },
]);

const getSelectedTab = (value) => {    
  if( value && value === "All"){
      selectedTab.value = "all"
  }else if(value && value === "Paid"){
      selectedTab.value = "paid"
  } else if(value && value === "Unpaid"){
      selectedTab.value = "unpaid"
  } else if(value && value === "Overdue"){
      selectedTab.value = "overdue"
  }
}

const getTransactionsData = async (filterQuery) => {
  let params = {
    state: filterQuery || 'all',
    page: 1
  }
  transactionsData.value = await transactions.getTransactions({params});
  console.log("transactions", transactionsData.value)
}

const refetchData = async (value) => {
  try {
    dialog.showLoading();
    const response = await http.get(value);
    transactionsData.value = response.data;
  } catch (error) {
      toast.error('Failed to load transactions. Please try again.');
      throw error;
  } finally {
    dialog.closeLoading();
  }
}

watch(selectedTab, (newValue) => {
  getTransactionsData(newValue)
})

onMounted(async() => {
  getTransactionsData(getSelectedTab.value)
})
</script>

