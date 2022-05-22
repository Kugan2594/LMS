import React, { useState } from "react";
import { ILeaveRequest } from "./LeaveRequest.interface";
import { FORM_VALIDATION, spaceValidation } from "src/util/ValidationMeassage";
import { Form, useForm } from "src/components/atoms/Forms/useForm";
import Input from "src/components/atoms/controlls/Input";
import { Divider, Grid } from "@mui/material";
import Button from "src/components/atoms/controlls/Button";
import DatePicker from "src/components/atoms/controlls/DatePicker";
import Select from "src/components/atoms/controlls/Select";
import { title } from "process";
import { Card, Container } from "@mui/material";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import { number } from "prop-types";
import LeaveRequestForm from "./LeaveRequestForm";
function LeaveRequest() {
    return (
        <div>
            <div>
                <PageTitleWrapper>
                    <PageTitle
                        heading="LeaveRequest"
                        subHeading="Master/LeaveRequest"
                        isButton={false}
                    />
                </PageTitleWrapper>
                <Divider />
            </div>
            <LeaveRequestForm isButton={true} isButtonTwo={true} />
            <br />
        </div>
    );
}

export default LeaveRequest;
