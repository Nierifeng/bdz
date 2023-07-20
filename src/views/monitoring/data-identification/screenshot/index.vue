<template>
  <el-row>
    <el-col :span="6" class="col">
      <div class="tag-info">
        <div class="img-size">
          <span>图片尺寸：</span> {{ imgWidth }} * {{ imgHeight }}
        </div>
        <div class="monitoring-angle">
          <el-form
            :model="angleFormData"
            :rules="angleRules"
            label-width="80px"
            :inline="false"
          >
            <el-form-item label="角度：" prop="angle">
              <el-input
                v-model.number="angle"
                style="width: 5rem !important; height: auto"
              >
                <template #suffix> ° </template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-table
        :data="tagList"
        border
        stripe
        @row-click="tableRowClick"
        class="table"
      >
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column label="名称" prop="name" />
        <el-table-column label="编号" prop="no" />
        <el-table-column label="类型">
          <template #default="{ row }">
            {{ tagTypeOptions.find(item => item.value === row.type).label }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" link @click="deleteTag(row.id)"
              >删除</el-button
            >
            <el-button type="primary" link @click="exportToSvg(row)"
              >exportTOSVG</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-row :gutter="20" class="action-row">
        <el-col :span="4" :offset="20">
          <el-button type="primary" size="default" @click="exportTagData"
            >导出数据</el-button
          >
        </el-col>
      </el-row>
      <el-input
        v-if="imgTagInfo"
        type="textarea"
        :rows="3"
        v-model="imgTagInfo"
        :maxlength="-1"
        :show-word-limit="false"
        :autosize="{ minRows: 2, maxRows: 4 }"
      />
    </el-col>
    <el-col :span="13" class="col">
      <div class="content">
        <canvas class="canvas" id="c" />
      </div>
    </el-col>
    <el-col :span="5">
      <el-button type="primary" :loading="addTag" @click="addTag = true">{{
        addTag ? "标记中" : "标记"
      }}</el-button>
      <div class="tag-info" v-show="selectTagInfo != undefined">
        <el-form
          :model="formData"
          ref="form"
          :rules="rules"
          label-width="80px"
          :inline="false"
        >
          <el-form-item label="名称" prop="name">
            <el-input v-model="formData.name" />
          </el-form-item>
          <el-form-item label="编号" prop="no">
            <el-input v-model="formData.no" />
          </el-form-item>
          <el-form-item label="位置">
            {{ formData.x }} , {{ formData.y }}
          </el-form-item>
          <el-form-item label="尺寸">
            {{ formData.width }} * {{ formData.height }}
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="formData.type" placeholder="请选择类型">
              <el-option
                v-for="item of tagTypeOptions"
                :label="item.label"
                :value="item.value"
                :key="item.value"
              />
            </el-select>
          </el-form-item>
          <div v-if="formData.type === '1'">
            <div class="add-row">
              <el-row v-for="(item, index) in formData.signalLamp" :key="index">
                <el-col :span="4" :offset="4">
                  <ColorPicker
                    v-model:pureColor="item.lable"
                    pickerType="chrome"
                    @pipette-click="hideTags"
                    @pipette-click-end="showTags"
                    disable-alpha
                  />
                </el-col>
                <el-col :span="12" class="form-input">
                  <el-input
                    v-model="item.value"
                    placeholder="请输入对应的数值"
                  />
                </el-col>
                <el-col :span="4">
                  <el-button
                    :icon="Minus"
                    circle
                    @click="deleteConfigItem(index)"
                  />
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4" :offset="20">
                  <el-button
                    :icon="Plus"
                    circle
                    @click="formData.signalLamp.push({ lable: '', value: '' })"
                  />
                </el-col>
              </el-row>
            </div>
          </div>
          <div v-if="formData.type === '2'">
            <el-form-item label="底色">
              <ColorPicker
                v-model:pureColor="formData.figure.bottomColour"
                pickerType="chrome"
                @pipette-click="hideTags"
                @pipette-click-end="showTags"
                disable-alpha
              />
            </el-form-item>
            <el-form-item label="数字">
              <ColorPicker
                v-model:pureColor="formData.figure.textColour"
                pickerType="chrome"
                @pipette-click="hideTags"
                @pipette-click-end="showTags"
                disable-alpha
              />
            </el-form-item>
          </div>
          <div v-if="formData.type === '3'">
            <el-row v-for="(item, index) in formData.signalLamp" :key="index">
              <el-col :span="10" class="form-input">
                <el-input v-model="item.angle" placeholder="请输入对应的角度" />
              </el-col>
              <el-col :span="10" class="form-input">
                <el-input v-model="item.value" placeholder="请输入对应的数值" />
              </el-col>
              <el-col :span="4">
                <el-button
                  :icon="Minus"
                  circle
                  @click="deleteConfigItem(index as number)"
                />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4" :offset="20">
                <el-button
                  :icon="Plus"
                  circle
                  @click="formData.switch.push({ angle: '', value: '' })"
                />
              </el-col>
            </el-row>
          </div>
        </el-form>

        <el-button type="primary" @click="onSubmit">确定</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
defineOptions({
  name: "screenshot"
});
import { Minus, Plus } from "@element-plus/icons-vue";
import { Column, ElMessage, FormInstance, FormRules } from "element-plus";
import { fabric } from "fabric";
import { ColorPicker } from "nie-colorpicker";
import "nie-colorpicker/style.css";
import { onMounted, reactive, ref } from "vue";
import background from "@/assets/bimg/bbga.jpg";

interface TagInfo {
  name?: string;
  no?: string;
  id?: string;
  type?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  signalLamp?: Array<KvType>;
  figure?: KvType;
  switch?: Array<KvType>;
}

interface KvType {
  [key: string]: any;
}

const imgWidth = ref(0);
const imgHeight = ref(0);
const imgTagInfo = ref("");
const angle = ref(0);

const tagList = ref<Array<TagInfo>>([]);
const tagTypeOptions = ref([
  { label: "信号灯", value: "1" },
  { label: "数字", value: "2" },
  { label: "开关", value: "3" },
  { label: "仪表", value: "4" },
  { label: "其他", value: "5" },
  { label: "竖向游标", value: "6" }
]);
let canvas: fabric.Canvas;

let addTag = false;
let isDown = false;
let startX = 0;
let startY = 0;
let rect: fabric.Rect;
let id = "";
let no = 0;

const img = new Image();

const selectTagInfo = ref();

const form = ref<FormInstance>();
const formData = ref<TagInfo>({
  name: "",
  no: "",
  type: "1",
  x: 0,
  y: 0,
  width: 0,
  height: 0
});

const angleFormData = reactive({
  angle: 0
});

const rules = reactive<FormRules>({
  name: [
    { required: true, message: "请输入名称", trigger: "blur", type: "string" }
  ],
  no: [
    { required: true, message: "请输入编号", trigger: "blur", type: "string" }
  ],
  versions: [{ required: true, message: "请选择版本", trigger: "change" }]
});

const angleRules = reactive<FormRules>({
  angle: [
    { required: true, message: "请输入角度", trigger: "blur", type: "number" },
    { type: "number", message: "角度必须为数字", trigger: "blur" }
  ]
});

async function onSubmit() {
  await form.value!.validate(async valid => {
    if (!valid) {
      return;
    }
    const tagInfo: TagInfo = JSON.parse(JSON.stringify(formData.value));
    const index = tagList.value.findIndex((item: TagInfo) => {
      if (item.id === tagInfo.id) {
        item = tagInfo;
        return true;
      }
    });
    tagList.value[index] = tagInfo;
    // 这里进行数据更改
  });
}

function hideTags() {
  console.log(canvas.getObjects());
  canvas.getObjects().forEach((item: any) => {
    item.set("visible", false);
    item.set("selectable", false);
  });
  canvas.discardActiveObject().renderAll();
}

function showTags() {
  canvas.getObjects().forEach((item: any) => {
    item.set("visible", true);
    item.set("selectable", true);
  });
  canvas.renderAll();
}

function tableRowClick(e: TagInfo, column: Column, _event: any) {
  // 在点击操作栏的时候不触发
  if (column.label === "操作") {
    return;
  }

  selectTagInfo.value = JSON.parse(JSON.stringify(e));
  formData.value = JSON.parse(JSON.stringify(e));
}

function deleteTag(id) {
  const index = tagList.value.findIndex((item: TagInfo) => {
    if (item.id === id) {
      return true;
    }
  });
  // 删除画布上的标记
  canvas.getObjects().forEach((item: fabric.Object) => {
    if (item.name === id) {
      canvas.remove(item);
    }
  });
  canvas.renderAll();
  // 重置form表单数据
  formData.value = {
    name: "",
    no: "",
    type: "1",
    x: 0,
    y: 0,
    width: 0,
    height: 0
  };

  selectTagInfo.value = null;

  tagList.value.splice(index, 1);
}

function exportToSvg(row) {
  const canvasOne = document.createElement("canvas");
  canvasOne.style.position = "absolute";
  canvasOne.style.left = "0";
  canvasOne.style.top = "0";
  canvasOne.width = row.width;
  canvasOne.height = row.height;
  const clx = canvasOne.getContext("2d");
  const sourceWidth = row.width;
  const sourceHeight = row.height;
  clx.drawImage(
    img,
    row.x,
    row.y,
    sourceWidth,
    sourceHeight,
    0,
    0,
    sourceWidth,
    sourceHeight
  );
  document.body.appendChild(canvasOne);
  // document.body.appendChild(img);
  console.log(canvasOne.toDataURL("image/png"));
  // console.log( canvas.toSVG());
}

function deleteConfigItem(index: number) {
  formData.value.signalLamp!.splice(index, 1);
}

function exportTagData() {
  // 请将imgWidth、imgHeight、tagList导出为一个json
  imgTagInfo.value = JSON.stringify({
    imgWidth: imgWidth.value,
    imgHeight: imgHeight.value,
    tagList: tagList.value
  });
}

onMounted(() => {
  canvas = new fabric.Canvas("c", {
    backgroundImage: background
  });
  img.onload = function () {
    const _this = this as HTMLImageElement;
    imgWidth.value = _this.width;
    imgHeight.value = _this.height;
    canvas.setWidth(_this.width);
    canvas.setHeight(_this.height);
  };
  img.src = background;

  canvas.on("mouse:down", event => {
    if (!addTag) return;
    if (event.target) {
      ElMessage({
        message: "请在空白处标记",
        type: "warning"
      });
      addTag = false;
      return;
    }
    isDown = true;
    const pointer = canvas.getPointer(event.e);
    startX = pointer.x;
    startY = pointer.y;

    id = generateRandomNum();

    // 创建一个矩形框对象，并设置样式
    rect = new fabric.Rect({
      name: id,
      left: startX,
      top: startY,
      width: pointer.x - startX,
      height: pointer.y - startY,
      fill: "rgba(255,255,255,0.3)",
      stroke: "gray",
      strokeWidth: 1,
      selectable: true
    });

    // 将矩形框添加到 canvas 上
    canvas.add(rect);
  });

  // 监听鼠标移动事件
  canvas.on("mouse:move", event => {
    if (!isDown) return;
    const pointer = canvas.getPointer(event.e);

    // 更新矩形框的宽度和高度
    if (pointer.x < startX) {
      rect.set({ left: Math.abs(pointer.x) });
    }
    if (pointer.y < startY) {
      rect.set({ top: Math.abs(pointer.y) });
    }
    rect.set({ width: Math.abs(pointer.x - startX) });
    rect.set({ height: Math.abs(pointer.y - startY) });

    // 重新渲染 canvas
    canvas.renderAll();
  });

  // 监听鼠标抬起事件
  canvas.on("mouse:up", () => {
    if (addTag) {
      const tagInfo: TagInfo = {
        id: id,
        name: `${++no}`,
        no: `${no}`,
        type: "1",
        x: rect.left,
        y: rect.top,
        width: Number(rect.getScaledWidth().toFixed(2)),
        height: Number(rect.getScaledHeight().toFixed(2)),
        signalLamp: [{ lable: "", value: "" }],
        figure: { bottomColour: "", textColour: "" },
        switch: [{ angle: "", value: "" }]
      };
      formData.value = tagInfo;
      selectTagInfo.value = tagInfo;
      tagList.value.push(JSON.parse(JSON.stringify(tagInfo)));
    }
    addTag = false;
    isDown = false;
  });

  canvas.on("object:modified", event => {
    if (!event.target) {
      return;
    }
    const index = tagList.value.findIndex(s => s.id == event.target.name);
    if (index > -1) {
      tagList.value[index].x = Number(event.target.left.toFixed(2));
      tagList.value[index].y = Number(event.target.top.toFixed(2));
      tagList.value[index].width = Number(
        event.target.getScaledWidth().toFixed(2)
      );
      tagList.value[index].height = Number(
        event.target.getScaledHeight().toFixed(2)
      );
      formData.value = JSON.parse(JSON.stringify(tagList.value[index]));
    }
  });

  // canvas.on("object:scaling", (event) => {
  //   console.log(event, "scaling");
  //   if (!event.target) {
  //     return;
  //   }
  //   const index = tagList.value.findIndex((s) => s.id == event.target.name);
  //   if (index > -1) {
  //     tagList.value[index].width = event.target.width;
  //     tagList.value[index].height = event.target.height;
  //     formData.value = JSON.parse(JSON.stringify(tagList.value[index]));
  //   }
  // })
});

function generateRandomNum() {
  const nums = [];
  for (let i = 0; i < 10; i++) {
    nums.push(i);
  }

  for (let i = nums.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  let result = "";
  for (let i = 0; i < 8; i++) {
    result += nums[i];
  }

  return result;
}
</script>

<style scoped lang="css">
.table {
  height: 150px;
  max-height: 550px;
  overflow: auto;
}

.action-row {
  padding: 1rem 0;
  padding-right: 2.5rem;
}

.canvas {
  width: 100%;
  height: 100vh;
}

.tag-info {
  padding-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
}

.col {
  padding: 0 1rem;
}

.content {
  overflow: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  height: 100%;
}

.form-input {
  padding-right: 0.5rem;
}

.tag-info {
  padding-top: 1.5rem;
}
</style>
