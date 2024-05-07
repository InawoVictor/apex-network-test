

<template>
  <div class=" mb-20">
    <div class="overflow-x-auto overflow-y-visible scroll">
      <table class="w-full ">
        <tbody>
          <tr
            v-for="(item, i) in displayedItems"
            :key="i"
            class="border border-l-transparent border-r-transparent border-t-[#EEEFF2] border-b-[#EEEFF2]  align-middle"
          >
            <td
              v-for="key in Object.keys(headers)"
              :key="key"
              class="text-sm font-medium px-6 py-2.5 whitespace-nowrap"
            >
              <slot :name="key" v-bind="item">
                {{ item[key] }}
              </slot>
            </td>
            <td
              class="w-[100px] px-4 py-2.5 relative whitespace-nowrap"
            >
              <slot name="action">
                  <span class="">
                    <img 
                      src="/svg/dots.svg" alt=""
                      class=" cursor-pointer z-0 w-[3rem]"
                      @click="showSelectedOption(item.id, data)"
                    >
                    <div                       
                      v-if="item.id === selectedItem"
                      class="absolute z-10 -left-24 top-2/3 w-[140px] h-[107px] bg-white flex flex-col shadow-lg rounded-md"
                    >
                      <div 
                        class="rounded-full bg-whiteBg absolute shadow-[0_0_2px_0,rgba(0, 0, 0,0.25)] cursor-pointer
                        border border-gray-200 -right-[1rem] -top-[1rem] h-[2rem] w-[2rem] flex items-center justify-center"
                        @click="selectedItem = null"
                      > 
                        <img src="/svg/close.svg" alt="" class="w-[7px] h-[7px]">
                      </div>
                        <span 
                          @click="$emit('edit', item.id)"
                          class="cursor-pointer py-2 pl-2.5 hover:bg-[#E7F7EF] text-[#383A47] hover:rounded-t-md transition-all duration-200 font-semibold text-sm border-b border-[#ECECEC]"
                        >
                          Edit 
                        </span>
                        <span 
                          @click="$emit('edit', item.id)"
                          class="cursor-pointer py-2 pl-2.5 text-[#383A47] hover:bg-[#E7F7EF] hover:rounded-t-md transition-all duration-200 font-semibold  text-sm border-b border-[#ECECEC]"
                        >
                          View profile 
                        </span>
                        <span 
                          @click="$emit('delete', item.id)"
                          class="cursor-pointer py-2 pl-2.5 pr-2.5 text-[#D30000] hover:bg-[#E7F7EF] hover:rounded-b-md transition-all duration-200 font-semibold text-sm border-[#ECECEC]"
                        >
                          Delete blog
                        </span>
                      </div>                    
                  </span>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-20 px-8 pb-16 flex items-center justify-between">
      <div>
        <span class="text-sm text-[#718096] font-normal">Show Result:</span>
        <select 
          v-model="selectedCount"
          class="text-black ml-5 pl-2 py-3 pr-4 border rounded-lg font-medium text-sm border-slate-300 outline-none"
        >
          <option 
            class="pl-2 py-2 "
            v-for="option in options" 
            :key="option" 
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>
      <div class="flex items-center gap-x-4">
        
        <ul class="flex ">
          <li :key="index"
            v-for="(link, index) in links"
            class="p-2 text-sm font-normal cursor-pointer text-[#A0AEC0]"
            @click="$emit('update:page', link.url)"
            >
            <span :class="
              link.active ? 'bg-[#E7F7EF] py-2 px-4 rounded-md' :
              link.url === null ? 'cursor-not-allowed' : ''
             "  v-html="formatLabel(link.label)" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'

interface Props<T> {
  headers: object,
  data: T,
  links: [],
  nextPageUrl: string,
  prevPageUrl: string,
}
const props = defineProps<Props<any>>()

const emit  = defineEmits(['delete', 'edit', 'update:page'])
const selectedItem = ref(null)
const options = [3, 6, 10 ]

const selectedCount = ref(10);

const displayedItems = computed(() => {
  return props.data.slice(0, selectedCount.value);
});

const formatLabel = (label) => {
  switch(label) {
    case '&laquo; Previous': return '&laquo; Previous';
    case 'Next &raquo;': return 'Next &raquo;';
    default: return label;
  }
}

const changePage = (url) => {
  if(url) {
    emit('update:page', url)
  }
}

const showOptions = ref(false)
const showSelectedOption = (id: number, data: []) => {
  let noOfItems = data.map((item,index) => {
    return item.id
  })
  selectedItem.value = noOfItems.find(item => item === id)
  
  showOptions.value = !showOptions.value
  if(showOptions.value){
    selectedItem.value = noOfItems.find(item => item === id)
  } else{
    selectedItem.value = null
  }
  return selectedItem.value    
}


</script>