import React from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { FinanceSecurityBank2 } from "../../icons/FinanceSecurityBank2";
import { FinanceSecurityIdCard1 } from "../../icons/FinanceSecurityIdCard1";
import { SocialConnectionUser11 } from "../../icons/SocialConnectionUser11";
import "./style.css";

export const ChatScreen = () => {
  return (
    <div className="chat-screen">
      <div className="chat-2">
        <div className="group-17">
          <div className="frame-73">
            <div className="overlap-77">
              <div className="overlap-wrapper-4">
                <div className="overlap-78">
                  <div className="overlap-wrapper-4">
                    <div className="overlap-78">
                      <div className="card-3" />

                      <div className="bg-7" />

                      <div className="btn-4">
                        <div className="overlap-group-23">
                          <div className="btn-bg-4">
                            <div className="btn-bg-5" />
                          </div>

                          <img
                            className="send-2"
                            alt="Send"
                            src="https://cdn.animaapp.com/projects/67f56811c32b493e71bc8ca0/releases/67f70d2c71d63f2aaae2edd1/img/send@2x.png"
                          />

                          <div className="text-wrapper-122">Send</div>
                        </div>

                        <div className="modal-edit-deal-5">
                          <div className="title-5">
                            <div className="text-wrapper-123">Edit Deal</div>

                            <Button
                              className="button-12"
                              style="white"
                              type="icon-only"
                            />
                          </div>

                          <div className="form-edit-deal-form-5">
                            <div className="content-SCROLL-4">
                              <div className="form-5">
                                <div className="upload-image-5">
                                  <div className="label-7">Room Images</div>

                                  <div className="image-16">
                                    <div className="placeholder-8">ADD</div>
                                  </div>
                                </div>

                                <Input
                                  className="input-8"
                                  label
                                  text="Address"
                                  text1="Street Address"
                                  visible2={false}
                                  visible3={false}
                                />
                                <div className="div-10">
                                  <Input
                                    className="input-9"
                                    label={false}
                                    text1="City"
                                    visible={false}
                                    visible1={false}
                                  />
                                  <Input
                                    className="state-8"
                                    divClassName="state-9"
                                    label={false}
                                    text1="State / Province"
                                    visible={false}
                                    visible1={false}
                                  />
                                  <Input
                                    className="zip-code-6"
                                    divClassName="zip-code-7"
                                    label={false}
                                    text1="Zip Code"
                                    visible={false}
                                    visible1={false}
                                  />
                                </div>

                                <div className="div-10">
                                  <Input
                                    className="input-9"
                                    label
                                    text="Room Area (m2)"
                                    text1="25"
                                    visible2={false}
                                    visible3={false}
                                  />
                                  <Input
                                    className="input-9"
                                    label
                                    text="# of People"
                                    text1="4"
                                    visible2={false}
                                    visible3={false}
                                  />
                                </div>

                                <Input
                                  className="input-8"
                                  label
                                  text="Appointment Date"
                                  text1="Nov 14, 2021"
                                  visible2={false}
                                />
                                <Input
                                  className="input-8"
                                  label
                                  text="Special Instructions"
                                  text1="Leave a special instructions"
                                  visible2={false}
                                  visible3={false}
                                />
                                <div className="div-10">
                                  <Input
                                    className="input-9"
                                    label
                                    text="Room Access"
                                    text1="Keys with doorman"
                                    visible2={false}
                                  />
                                  <Input
                                    className="input-9"
                                    label
                                    text="Price ($)"
                                    text1="5000"
                                    visible2={false}
                                    visible3={false}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="action-9">
                              <div className="progress-13">
                                <div className="text-wrapper-124">Progress</div>

                                <Input
                                  className="progress-14"
                                  label={false}
                                  text1="In Progress"
                                  visible={false}
                                />
                              </div>

                              <div className="action-10">
                                <Button
                                  className="button-13"
                                  style="primary"
                                  text="Done"
                                  type="default"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button className="btn-5">
                        <div className="overlap-79">
                          <div className="btn-bg-6">
                            <div className="btn-bg-7" />
                          </div>

                          <div className="text-wrapper-125">
                            Enter Message...
                          </div>
                        </div>
                      </button>

                      <div className="line-45" />
                    </div>
                  </div>

                  <div className="chat-conversation-2">
                    <div className="overlap-80">
                      <div className="msg-8">
                        <img
                          className="rectangle-25"
                          alt="Rectangle"
                          src="https://cdn.animaapp.com/projects/67f56811c32b493e71bc8ca0/releases/67f70d2c71d63f2aaae2edd1/img/rectangle.svg"
                        />

                        <div className="overlap-81">
                          <div className="img-copy-2">
                            <div className="overlap-group-24">
                              <img
                                className="img-5"
                                alt="Img"
                                src="https://cdn.animaapp.com/projects/67f56811c32b493e71bc8ca0/releases/67f70d2c71d63f2aaae2edd1/img/img-3.png"
                              />
                            </div>
                          </div>

                          <div className="img-6">
                            <div className="overlap-group-24">
                              <img
                                className="img-5"
                                alt="Img"
                                src="https://cdn.animaapp.com/projects/67f56811c32b493e71bc8ca0/releases/67f70d2c71d63f2aaae2edd1/img/img-4.png"
                              />
                            </div>
                          </div>

                          <div className="text-wrapper-126">10:00</div>

                          <div className="text-wrapper-127">John Howard</div>
                        </div>

                        <div className="ellipsis-v-7" />
                      </div>

                      <div className="msg-9">
                        <div className="overlap-82">
                          <div className="bg-8" />

                          <img
                            className="rectangle-26"
                            alt="Rectangle"
                            src="https://cdn.animaapp.com/projects/67f56811c32b493e71bc8ca0/releases/67f70d2c71d63f2aaae2edd1/img/rectangle-4.svg"
                          />

                          <div className="wow-that-s-great-2">
                            se murio chiwis
                          </div>

                          <div className="text-wrapper-128">10:02</div>

                          <div className="marcus-2">gorylove</div>
                        </div>

                        <div className="ellipsis-v-8" />
                      </div>

                      <div className="msg-10">
                        <img
                          className="rectangle-25"
                          alt="Rectangle"
                          src="https://cdn.animaapp.com/projects/67f56811c32b493e71bc8ca0/releases/67f70d2c71d63f2aaae2edd1/img/rectangle-1.svg"
                        />

                        <div className="overlap-83">
                          <div className="text-wrapper-129">
                            Next meeting tomorrow 10.00AM
                          </div>

                          <div className="text-wrapper-130">10:04</div>

                          <div className="text-wrapper-131">Galen Rizo</div>
                        </div>

                        <div className="ellipsis-v-9" />
                      </div>

                      <div className="msg-11">
                        <img
                          className="rectangle-25"
                          alt="Rectangle"
                          src="https://cdn.animaapp.com/projects/67f56811c32b493e71bc8ca0/releases/67f70d2c71d63f2aaae2edd1/img/rectangle-2.svg"
                        />

                        <div className="overlap-84">
                          <p className="text-wrapper-132">
                            What about our next meeting?
                          </p>

                          <div className="text-wrapper-130">10:04</div>

                          <div className="text-wrapper-131">Galen Rizo</div>
                        </div>

                        <div className="ellipsis-v-10" />
                      </div>

                      <div className="msg-12">
                        <img
                          className="rectangle-25"
                          alt="Rectangle"
                          src="https://cdn.animaapp.com/projects/67f56811c32b493e71bc8ca0/releases/67f70d2c71d63f2aaae2edd1/img/rectangle-5.svg"
                        />

                        <div className="overlap-85">
                          <div className="text-wrapper-129">Hello!</div>

                          <div className="text-wrapper-130">10:04</div>

                          <div className="text-wrapper-131">Galen Rizo</div>
                        </div>

                        <div className="ellipsis-v-11" />
                      </div>

                      <div className="msg-13">
                        <div className="overlap-86">
                          <div className="bg-9" />

                          <img
                            className="rectangle-27"
                            alt="Rectangle"
                            src="https://cdn.animaapp.com/projects/67f56811c32b493e71bc8ca0/releases/67f70d2c71d63f2aaae2edd1/img/rectangle-4-1.svg"
                          />

                          <div className="text-wrapper-133">
                            Good morning everyone !
                          </div>

                          <div className="text-wrapper-134">10:02</div>

                          <div className="text-wrapper-135">Marcus</div>
                        </div>

                        <div className="ellipsis-v-8" />
                      </div>

                      <div className="msg-14">
                        <img
                          className="rectangle-25"
                          alt="Rectangle"
                          src="https://cdn.animaapp.com/projects/67f56811c32b493e71bc8ca0/releases/67f70d2c71d63f2aaae2edd1/img/rectangle-6.svg"
                        />

                        <div className="overlap-87">
                          <div className="text-wrapper-129">
                            Good morning everyone !
                          </div>

                          <div className="text-wrapper-126">10:00</div>

                          <div className="text-wrapper-127">John Howard</div>
                        </div>

                        <div className="ellipsis-v-12" />
                      </div>

                      <div className="overlap-88">
                        <div className="line-46" />

                        <button className="btn-6">
                          <div className="overlap-89">
                            <div className="text-wrapper-136">Today</div>
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className="line-47" />

                    <div className="topbar-2">
                      <div className="overlap-90">
                        <div className="ellipsis-h-3" />

                        <div className="search-6" />

                        <div className="text-wrapper-137">12 Members</div>

                        <div className="users-alt-3" />

                        <div className="designers-4">Campaign Content</div>
                      </div>
                    </div>
                  </div>

                  <div className="left-card-2">
                    <div className="overlap-91">
                      <img
                        className="card-4"
                        alt="Card"
                        src="https://cdn.animaapp.com/projects/67f56811c32b493e71bc8ca0/releases/67f70d2c71d63f2aaae2edd1/img/card-1.svg"
                      />

                      <div className="bg-10" />

                      <div className="contacts-2">
                        <div className="user-13">
                          <div className="overlap-92">
                            <div className="text-wrapper-138">04 Hrs</div>

                            <div className="text-wrapper-139">Vernon Smith</div>

                            <div className="user-14">
                              <div className="overlap-group-25">
                                <div className="bg-11" />

                                <div className="rectangle-28" />

                                <div className="text-wrapper-140">V</div>
                              </div>
                            </div>
                          </div>

                          <div className="line-48" />
                        </div>

                        <div className="user-15">
                          <div className="overlap-92">
                            <div className="text-wrapper-141">01 Hr</div>

                            <div className="text-wrapper-142">Annie Holder</div>

                            <div className="user-16">
                              <div className="overlap-group-26">
                                <img
                                  className="img-7"
                                  alt="Img"
                                  src="https://cdn.animaapp.com/projects/67f56811c32b493e71bc8ca0/releases/67f70d2c71d63f2aaae2edd1/img/img@2x.png"
                                />

                                <div className="rectangle-29" />
                              </div>
                            </div>
                          </div>

                          <div className="line-48" />
                        </div>

                        <div className="user-17">
                          <div className="overlap-92">
                            <div className="text-wrapper-143">22 min</div>

                            <div className="text-wrapper-144">
                              Bernard Spencer
                            </div>

                            <div className="user-16">
                              <div className="overlap-group-26">
                                <img
                                  className="img-7"
                                  alt="Img"
                                  src="https://cdn.animaapp.com/projects/67f56811c32b493e71bc8ca0/releases/67f70d2c71d63f2aaae2edd1/img/img-1@2x.png"
                                />

                                <div className="rectangle-30" />
                              </div>
                            </div>
                          </div>

                          <div className="line-48" />
                        </div>

                        <div className="user-18">
                          <div className="overlap-92">
                            <div className="badge-2">
                              <div className="overlap-group-27">
                                <div className="text-wrapper-145">01</div>
                              </div>
                            </div>

                            <div className="text-wrapper-146">10 min</div>

                            <div className="text-wrapper-147">Galen Rizo</div>

                            <div className="user-14">
                              <div className="overlap-group-25">
                                <div className="bg-11" />

                                <div className="rectangle-28" />

                                <div className="text-wrapper-148">G</div>
                              </div>
                            </div>
                          </div>

                          <div className="line-48" />
                        </div>

                        <div className="overlap-93">
                          <div className="overlap-94">
                            <div className="user-19">
                              <div className="overlap-92">
                                <div className="text-wrapper-143">02 min</div>

                                <div className="text-wrapper-149">
                                  John Howard
                                </div>

                                <div className="user-16">
                                  <div className="overlap-group-26">
                                    <img
                                      className="img-7"
                                      alt="Img"
                                      src="https://cdn.animaapp.com/projects/67f56811c32b493e71bc8ca0/releases/67f70d2c71d63f2aaae2edd1/img/img-2@2x.png"
                                    />

                                    <div className="rectangle-28" />
                                  </div>
                                </div>
                              </div>

                              <div className="line-48" />
                            </div>

                            <div className="text-wrapper-150"> New Group</div>

                            <div className="plus-wrapper">
                              <img
                                className="plus-3"
                                alt="Plus"
                                src="https://cdn.animaapp.com/projects/67f56811c32b493e71bc8ca0/releases/67f70d2c71d63f2aaae2edd1/img/plus@2x.png"
                              />
                            </div>
                          </div>

                          <div className="text-wrapper-151">Contacts</div>

                          <div className="user-20" />
                        </div>

                        <div className="line-49" />
                      </div>

                      <div className="groups-2">
                        <div className="overlap-95">
                          <div className="meeting-2">
                            <div className="overlap-group-28">
                              <div className="text-wrapper-152">Meeting</div>

                              <div className="user-21">
                                <div className="div-11" />
                              </div>
                            </div>
                          </div>

                          <div className="designers-5">
                            <div className="overlap-96">
                              <div className="designers-6">
                                Campaign Content
                              </div>

                              <div className="user-21">
                                <div className="div-11" />
                              </div>
                            </div>
                          </div>

                          <div className="overlap-97">
                            <div className="overlap-98">
                              <div className="general-2">
                                <div className="overlap-99">
                                  <div className="text-wrapper-153">
                                    General
                                  </div>

                                  <div className="user-22">
                                    <div className="overlap-group-29">
                                      <div className="text-wrapper-148">G</div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="text-wrapper-150"> New Group</div>

                              <div className="plus-wrapper">
                                <img
                                  className="plus-3"
                                  alt="Plus"
                                  src="https://cdn.animaapp.com/projects/67f56811c32b493e71bc8ca0/releases/67f70d2c71d63f2aaae2edd1/img/plus-1@2x.png"
                                />
                              </div>
                            </div>

                            <div className="text-wrapper-154">Groups</div>

                            <div className="users-alt-4" />
                          </div>

                          <div className="line-49" />
                        </div>
                      </div>

                      <div className="search-7">
                        <div className="overlap-100">
                          <div className="bg-12" />

                          <div className="text-wrapper-155">Search...</div>

                          <div className="search-8" />
                        </div>
                      </div>

                      <div className="user-23">
                        <div className="overlap-101">
                          <div className="text-wrapper-156">Available</div>

                          <div className="ellipsis-h-4" />

                          <div className="circle-wrapper">
                            <img
                              className="circle-3"
                              alt="Circle"
                              src="https://cdn.animaapp.com/projects/67f56811c32b493e71bc8ca0/releases/67f70d2c71d63f2aaae2edd1/img/circle@2x.png"
                            />
                          </div>

                          <div className="text-wrapper-157">Marcus</div>

                          <img
                            className="user-24"
                            alt="User"
                            src="https://cdn.animaapp.com/projects/67f56811c32b493e71bc8ca0/releases/67f70d2c71d63f2aaae2edd1/img/user@2x.png"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <img
                className="rectangle-31"
                alt="Rectangle"
                src="https://cdn.animaapp.com/projects/67f56811c32b493e71bc8ca0/releases/67f70d2c71d63f2aaae2edd1/img/rectangle-1739.png"
              />

              <img
                className="image-17"
                alt="Image"
                src="https://cdn.animaapp.com/projects/67f56811c32b493e71bc8ca0/releases/67f5f9e0a1ef88816a121b97/img/image-13.png"
              />

              <img
                className="comment-5"
                alt="Comment"
                src="https://cdn.animaapp.com/projects/67f56811c32b493e71bc8ca0/releases/67f70d2c71d63f2aaae2edd1/img/comment.svg"
              />

              <SocialConnectionUser11
                className="social-connection-user-7"
                color="#848484"
              />
              <FinanceSecurityBank2
                className="finance-security-bank-3"
                color="#848484"
              />
              <img
                className="notification-5"
                alt="Notification"
                src="https://cdn.animaapp.com/projects/67f56811c32b493e71bc8ca0/releases/67f70d2c71d63f2aaae2edd1/img/notification@2x.png"
              />

              <FinanceSecurityIdCard1
                className="finance-security-id-card"
                color="#848484"
              />
              <img
                className="line-50"
                alt="Line"
                src="https://cdn.animaapp.com/projects/67f56811c32b493e71bc8ca0/releases/67f70d2c71d63f2aaae2edd1/img/line-254.svg"
              />

              <img
                className="line-51"
                alt="Line"
                src="https://cdn.animaapp.com/projects/67f56811c32b493e71bc8ca0/releases/67f70d2c71d63f2aaae2edd1/img/line-254.svg"
              />

              <img
                className="line-52"
                alt="Line"
                src="https://cdn.animaapp.com/projects/67f56811c32b493e71bc8ca0/releases/67f70d2c71d63f2aaae2edd1/img/line-254.svg"
              />

              <img
                className="line-53"
                alt="Line"
                src="https://cdn.animaapp.com/projects/67f56811c32b493e71bc8ca0/releases/67f70d2c71d63f2aaae2edd1/img/line-254.svg"
              />

              <img
                className="line-54"
                alt="Line"
                src="https://cdn.animaapp.com/projects/67f56811c32b493e71bc8ca0/releases/67f70d2c71d63f2aaae2edd1/img/line-254.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
