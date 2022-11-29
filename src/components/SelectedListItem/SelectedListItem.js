import React from "react";
import { useState } from "react";
import './SelectedListItem.scss'
// import "antd/dist/antd.css";
import { v4 as uuid } from "uuid";
// import "antd/dist/antd.min.css";
import {
  Card,
  Modal,
  Typography,
  DatePicker,
  Space,
  Button,
  Form,
  Progress,
  Input,
  List,
} from "antd";
import dayjs from "dayjs";
import { Checkbox } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
// import { checklistArray } from "./dummydata";
import { CgViewComfortable } from "react-icons/cg";
import { TfiArrowTopRight } from "react-icons/tfi";
import { BsTextParagraph } from "react-icons/bs";
import { GrFormAttachment } from "react-icons/gr";
import { GrAttachment } from "react-icons/gr";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { TfiTimer } from "react-icons/tfi";
import { BsEmojiSmile } from "react-icons/bs";
import { BiCheckSquare } from "react-icons/bi";
import { MdOutlineChecklistRtl } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import { AiFillPlusCircle } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { IoIosPersonAdd } from "react-icons/io";
import { BiDotsHorizontalRounded } from "react-icons/bi";
// import moment from "moment";
import moment from "moment-timezone";
import TextArea from "antd/es/input/TextArea";

// Let us open our database
// const request = window.indexedDB.open("Database", 1);

// request.onupgradeneeded = (event) => {
//   const data = event.target.result;
//   // below code defines the name of the object ---'description'
//   const store = data.createObjectStore("description", {
//     keyPath: "name",
//     autoIncrement: true,
//   });
//   // below code defines the name of the object ---'description'

//   store.createIndex("name", "name", { value: "sandeep" }, { unique: false });
// };
// request.onerror = (event) => {
//   console.error(`Database error: ${event.target.errorCode}`);
// };
// request.onsuccess = (event) => {
//   console.log("Database created Succesfully");
// };
const SelectedListItem = () =>{
    const [checklistform] = Form.useForm();
    const [activityForm] = Form.useForm();
    const { Title } = Typography;
  
    let dummydata = {
      title: "question title to go back",
      listitemname: "This displays the question of the listitem",
      members: "mail",
      labels: "colors",
      date: "1-2-3456 1:32",
      description: "sand",
      attachments: "attached link here",
      checklist: "checklist",
      activity: "activity",
      activity_message: "message at time",
    };
  
    // MODAL METHODS
    const [resetModal, setResetModal] = useState(false);
    const [attachmentModal, setAttachmentModal] = useState(false);
  
    // DESCRIPTION HANDLERS
    const [enableEditMode, setEnableEditMode] = useState(false);
    const [descriptionData, setDescriptionData] = useState("");
    const [btndisabled, setbtndisabled] = useState(true);
    const onValuesChange = (changedValues, allValues) => {
      if (allValues.data !== undefined && allValues.data !== "") {
        setbtndisabled(false);
      } else {
        setbtndisabled(true);
      }
      // console.log(allValues);
    };
    const onFinishDescriptionHandler = (values) => {
      setDescriptionData(values.data);
      setEnableEditMode(!enableEditMode);
    };
    const descriptionEditMode = () => {
      setEnableEditMode(!enableEditMode);
      setbtndisabled(!btndisabled);
    };
  
    // CHECK BOX METHODS ND FUNCTIONS
  
    const [checkList, setCheckList] = useState(false);
    const [checkAdd, setCheckAdd] = useState(true);
    const [checkboxData, setCheckboxData] = useState([]);
    const [check, setCheck] = useState(false);
    const [percent, setPercent] = useState(0);
    const [checklistDeleteModal, setChecklistDeleteModal] = useState(false);
    const [hide, setHide] = useState(false);
    const [allData, setAllData] = useState([]);
  
    const checklistHandler = () => {
      setCheckList(!checkList);
      setCheckAdd(!checkAdd);
    };
    const checklistSubmitHandler = (e) => {
      const newcheckboxdata = [...checkboxData];
      newcheckboxdata.push({
        id: uuid().slice(0, 3),
        checkItem: e.checkItem,
        checkStatus: "unchecked",
      });
      checklistform.resetFields();
      setCheckboxData(newcheckboxdata);
    };
  
    const onChangeCheck = (item, e) => {
      if (e.target.checked) {
        setCheck(e.target.checked);
        item["checkStatus"] = "checked";
        setPercent(percent + 100 / checkboxData.length);
      } else {
        setCheck(e.target.unchecked);
        item["checkStatus"] = "unchecked";
        setPercent(percent - 100 / checkboxData.length);
      }
    };
    const deleteEntireCheckData = () => {
      setCheckboxData([]);
      setPercent(0);
      setChecklistDeleteModal(false);
      // console.log("checkbox data deleted successful");
    };
    const hideCheckedItemsHandler = () => {
      setAllData(checkboxData);
      const filtered = checkboxData.filter((item) => {
        return item.checkStatus === "unchecked";
      });
      setCheckboxData(filtered);
      setHide(!hide);
      setCheck(!check);
    };
    const showCheckedItemsHandler = () => {
      setCheckboxData(allData);
      setHide(!hide);
      setCheck(!check);
    };
    // ACTIVITY HANDLERS
    const [activity, setActivity] = useState(false);
    const [activityData, setActivityData] = useState([]);
  
    // const timeactivity = () => {
    //   let today = moment().utcOffset("+05:30")
    //   console.log(today)
    //   let yesterday = today.add(-1, 'days');
    //   console.log(yesterday)
  
    // };
    // timeactivity();
  
    const activitySubmitHandler = (e) => {
      let now = moment(new Date());
      let timestamps = now.tz("Asia/Kolkata").format("hh:mm A");
      const newactivitydata = [...activityData];
      newactivitydata.push({
        id: uuid().slice(0, 3),
        activity: e.activityInputData,
        timestamps: String(timestamps),
      });
      setActivityData(newactivitydata);
      activityForm.resetFields();
    };
    const deleteActivityStatus = (item) => {
      let id = item.id;
      activityData.forEach((i) => {
        if (i.id === id) {
          setActivityData(activityData.filter((activity) => activity.id !== id));
          // console.log("activity deleted succesful");
        } else {
          console.log("no such id found");
        }
      });
    };
    // LABEL MODAL AND METHOD HANDLERS
    const [labelModal, setLabelModal] = useState(false);
    // DATE HANDLERS
    const [dateChecked, setDateChecked] = useState(false);
    const onChangeDateCheckBox = (e) => {
      if (e.target.checked) {
        setDateChecked(true);
      } else {
        setDateChecked(false);
      }
      // console.log(`checked = ${e.target.checked}`);
    };
    function dateDiffInDays(a, b) {
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
      return Math.floor((utc1 - utc2) / _MS_PER_DAY);
    }
    const [duration, setDuration] = useState();
    const [timeLeft, setTimeLeft] = useState(0);
    const onChangeDatePicker = (date, dateString) => {
      setDuration(date, dateString);
      let a = new Date(moment(dateString)._i);
      let b = new Date(moment(new Date()).format("YYYY-MM-DD"));
      const difference = dateDiffInDays(a, b);
      setTimeLeft(difference);
    };
    return (
      <>
        <Card onClick={() => setResetModal(!resetModal)}>
          {dummydata.listitemname}
        </Card>
        <Modal
          centered
          width={800}
          footer={null}
          open={resetModal}
          onOk={() => setResetModal(false)}
          onCancel={() => setResetModal(false)}
          style={{
            top: 50,
            borderRadius: "0px",
          }}
        >
          <section className="pop-up-main-section">
            <Space align="top">
              <Title level={3}>
                <CgViewComfortable />{" "}
              </Title>
  
              {dummydata.listitemname ? (
                <Space direction="vertical">
                  <Title level={3} className="listnametitle">
                    {dummydata.listitemname}
                  </Title>
                  <p>
                    in list{" "}
                    <a href="/" className="back">
                      {dummydata.title}
                    </a>
                  </p>
                </Space>
              ) : null}
            </Space>
            <section className="pop-up-sub-section">
              <section className="pop-up-left-section">
                <section className="pop-up-label-and-date-section">
                  {dummydata.members ? (
                    <div className="members-section">
                      <div className="members-icon-container"></div>
                      <div className="memebers-content-section">
                        <p>Members</p>
                        <div className="pop-up-members-section">
                          <Space>
                            <div className="pop-up-members">P</div>
                            <div className="pop-up-members">S</div>
                            <div className="pop-up-members">D</div>
                            <AiFillPlusCircle className="pop-up-members-icon" />
                          </Space>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {dummydata.labels ? (
                    <div className="label-section">
                      <div className="label-icon-section"></div>
                      <div className="label-content-section">
                        <p level={5}>Labels</p>
                        <section className="pop-up-label-section">
                          <Card className="pop-up-label-card">color-red</Card>
                          <Card className="pop-up-label-card">color-yellow</Card>
                          <Card className="pop-up-label-card">color</Card>
                          <Card className="pop-up-label-card">color</Card>
                          <PlusSquareOutlined
                            className="pop-up-label-icon"
                            onClick={() => setLabelModal(!labelModal)}
                          />
                          <Modal
                            centered
                            width={400}
                            footer={null}
                            open={labelModal}
                            onOk={() => setLabelModal(false)}
                            onCancel={() => setLabelModal(false)}
                          >
                            Label Modal
                          </Modal>
                        </section>
                      </div>
                    </div>
                  ) : null}
                  {dummydata.date ? (
                    <div className="date-section">
                      <div className="date-icon-section"></div>
                      <div className="date-content-section">
                        <p level={5}>Due date</p>
                        <Checkbox onChange={onChangeDateCheckBox}>
                          <section className="date-check-container">
                            <DatePicker onChange={onChangeDatePicker}>
                              {dayjs(duration)}
                            </DatePicker>
                            <span>
                              {duration ? (
                                dateChecked === false ? (
                                  timeLeft !== 0 ? (
                                    timeLeft > 0 && timeLeft < 5 ? (
                                      <span className="warning">due soon</span>
                                    ) : (
                                      <span className="danger">over due</span>
                                    )
                                  ) : null
                                ) : (
                                  <span className="success">completed</span>
                                )
                              ) : null}
                            </span>
                          </section>
                        </Checkbox>
                      </div>
                    </div>
                  ) : null}
                </section>
  
                <div className="description-section">
                  <div className="description-icon-section">
                    <Title level={3}>
                      <BsTextParagraph />
                    </Title>
                  </div>
                  <div className="description-content-section">
                    <Title level={4}>
                      Descrpition
                      {descriptionData ? (
                        <Button type="text" className="description-edit-button" onClick={descriptionEditMode}>
                          Edit
                        </Button>
                      ) : null}
                    </Title>
                    {enableEditMode ? (
                      <p className="description-paragraph">{descriptionData}</p>
                    ) : (
                      <Form
                        onFinish={(data) => onFinishDescriptionHandler(data)}
                        onFinishFailed={(error) => {
                          console.log({ error });
                        }}
                        onValuesChange={onValuesChange}
                      >
                        <Form.Item name="data">
                          <TextArea
                            autoSize={{
                              minRows: 3,
                              maxRows: 6,
                            }}
                            defaultValue={descriptionData ? descriptionData : ""}
                            placeholder="Add a more detailed description..."
                          />
                        </Form.Item>
                        <Form.Item>
                          <section className="description-submit-section">
                            <Space>
                              <Button
                                htmlType="submit"
                                type="primary"
                                disabled={btndisabled}
                              >
                                Submit
                              </Button>
                              <Button type="text" onClick={descriptionEditMode}>
                                Cancle
                              </Button>
                            </Space>
                            <section>
                              <Button type="text">Formatting Help</Button>
                            </section>
                          </section>
                        </Form.Item>
                      </Form>
                    )}
                  </div>
                </div>
                {dummydata.attachments ? (
                  <section className="attachment-section">
                    <div className="attachment-icon-section">
                      <Title level={3}>
                        <GrFormAttachment className="icon" />
                      </Title>
                    </div>
                    <section className="attachment-content-section">
                      <Title level={4}>Attachments</Title>
                      <section className="link-section">
                        <section className="link-image">LINK</section>
                        <section className="link-matter">
                          <p className="attachment-link">
                            link http://{dummydata.attachments}
                            <span>
                              {" "}
                              <TfiArrowTopRight />
                            </span>
                          </p>
                          <p>
                            Added 43 minutes go - <a href="/">Comment</a> -{" "}
                            <a href="/">Remove</a> - <a href="/">Edit</a>
                          </p>
                        </section>
                      </section>
                      <Button
                        type="text"
                        onClick={() => {
                          setAttachmentModal(true);
                        }}
                      >
                        Add an Attachment
                      </Button>
                      <Modal
                        title="Add Attachment Pop-up"
                        centered
                        footer={null}
                        open={attachmentModal}
                        onOk={() => setAttachmentModal(false)}
                        onCancel={() => setAttachmentModal(false)}
                      ></Modal>
                    </section>
                  </section>
                ) : null}
  
                {dummydata.checklist ? (
                  <div className="checklist-section">
                    <div className="checklist-icon-section">
                      <Title level={3}>
                        <BiCheckSquare />
                      </Title>
                    </div>
                    <section className="checklist-content-section">
                      <section className="checklist-title-section">
                        <Title level={4}>Checklist</Title>
                        <Space>
                          {check ? (
                            <Button type="text" onClick={hideCheckedItemsHandler}>
                              Hide Checked Items
                            </Button>
                          ) : null}
                          {hide ? (
                            <Button type="text" onClick={showCheckedItemsHandler}>
                              Show Checked Items
                            </Button>
                          ) : null}
                          <Button
                            type="text"
                            onClick={() => setChecklistDeleteModal(true)}
                          >
                            Delete
                          </Button>
                        </Space>
                        <Modal
                          centered
                          title="Delete Checklist"
                          width={400}
                          footer={null}
                          open={checklistDeleteModal}
                          onOk={() => setChecklistDeleteModal(false)}
                          onCancel={() => setChecklistDeleteModal(false)}
                        >
                          <p>
                            Deleting a checklist is permanent and there is no way
                            to get it back.
                          </p>
                          <Button
                            type="primary"
                            danger
                            onClick={deleteEntireCheckData}
                          >
                            Delete CheckList
                          </Button>
                        </Modal>
                      </section>
                      <section className="pop-up-progress-container">
                        <Progress percent={percent} />
                      </section>
                      {checkboxData.length > 0 ? (
                        <List
                          dataSource={checkboxData}
                          renderItem={(item) => (
                            <List.Item>
                              <Checkbox
                                className={
                                  item.checkStatus === "checked"
                                    ? "overlinestyle"
                                    : "disableoverline"
                                }
                                onChange={(e) => {
                                  onChangeCheck(item, e);
                                }}
                                defaultChecked={
                                  item.checkStatus === "checked" ? true : false
                                }
                              >
                                <Space
                                  block="true"
                                  className="checklist-item-container"
                                >
                                  <div className="check-matter">
                                    {item.checkItem}
                                  </div>
                                  <Space className="hider">
                                    <BiTimeFive className="hide-icon" />
                                    <IoIosPersonAdd className="hide-icon" />
                                    <BiDotsHorizontalRounded className="hide-icon" />
                                  </Space>
                                </Space>
                              </Checkbox>
                            </List.Item>
                          )}
                        />
                      ) : null}
                      {checkAdd ? (
                        <Button type="text" onClick={checklistHandler}>
                          Add an Item
                        </Button>
                      ) : null}
                      {checkList ? (
                        <Form
                          form={checklistform}
                          onFinish={(e) => checklistSubmitHandler(e)}
                          onFinishFailed={(error) => {
                            console.log({ error });
                          }}
                        >
                          <Form.Item name="checkItem">
                            <TextArea
                              autoSize={{
                                minRows: 2,
                                maxRows: 6,
                              }}
                              placeholder="Add a more detailed checklist"
                            />
                          </Form.Item>
                          <Form.Item>
                            <section className="checklist-submit-section">
                              <Space>
                                <Button
                                  type="primary"
                                  className="btn-primary"
                                  htmlType="submit"
                                >
                                  Add
                                </Button>
  
                                <Button type="text" onClick={checklistHandler}>
                                  Cancle
                                </Button>
                              </Space>
  
                              <section>
                                <Space>
                                  <Button type="text">
                                    <BsFillPersonPlusFill />{" "}
                                    <a href="/">Assign</a>
                                  </Button>
                                  <Button type="text">
                                    <TfiTimer />
                                    <a href="/">Due Date</a>
                                  </Button>
                                  <Button type="text">@</Button>
                                  <Button type="text">
                                    <BsEmojiSmile />
                                  </Button>
                                </Space>
                              </section>
                            </section>
                          </Form.Item>
                        </Form>
                      ) : null}
                    </section>
                  </div>
                ) : null}
  
                <section className="activity-section">
                  <div className="activity-icon-section">
                    <Title level={3}>
                      <MdOutlineChecklistRtl />
                    </Title>
                  </div>
                  <section className="activity-content-section">
                    <Title level={4}>Activity</Title>
                    <Button
                      type="text"
                      onClick={() => {
                        setActivity(!activity);
                      }}
                    >
                      {activity ? "Hide details" : "Show details"}
                    </Button>
                  </section>
                </section>
                <section className="activity-input-section">
                  <section className="activity-input-icon-section">s</section>
  
                  <Form
                    form={activityForm}
                    onFinish={(e) => activitySubmitHandler(e)}
                  >
                    <Form.Item name="activityInputData">
                      <Input
                        placeholder="Write a comment..."
                        style={{ borderRadius: "0px" }}
                      />
                    </Form.Item>
                    <Form.Item>
                      <section className="activity-submit-section">
                        <section>
                          <Button
                            type="primary"
                            className="btn-primary"
                            htmlType="submit"
                          >
                            Save
                          </Button>
                        </section>
                        <section>
                          <Button type="text">
                            <GrAttachment />
                          </Button>
                          <Button type="text">@</Button>
                          <Button type="text">
                            <BsEmojiSmile />
                          </Button>
                          <Button type="text">
                            <FaRegAddressCard />
                          </Button>
                        </section>
                      </section>
                    </Form.Item>
                  </Form>
                </section>
                {activity ? (
                  <List
                    dataSource={activityData}
                    renderItem={(item) => (
                      <List.Item className="activity-status">
                        <section className="activity-status-icon">s</section>
                        <section className="activity-status-content">
                          <p>spandala today at {item.timestamps}</p>
                          <div className="activity-status-matter">
                            {item.activity}
                          </div>
                          <div className="activity-status-options-section">
                            <BsEmojiSmile className="activity-status-options-icons" />
                            <p>Edit </p>
                            <p
                              onClick={() => {
                                deleteActivityStatus(item);
                              }}
                            >
                              Delete
                            </p>
                          </div>
                        </section>
                      </List.Item>
                    )}
                  />
                ) : null}
              </section>
  
              <section className="pop-up-right-section">right</section>
            </section>
          </section>
        </Modal>
      </>
    );
}
export default SelectedListItem;