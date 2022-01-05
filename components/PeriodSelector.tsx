import {Radio, Space} from "antd";
import {useState} from "react";
import {RangePicker} from "rc-picker";

const dateSelectionOptions = [
    {
        label: "Month",
        value: "month"
    },
    {
        label: "Week",
        value: "week"
    },
    {
        label: "Day",
        value: "day"
    },
    {
        label: "Period",
        value: "period",
        disabled: true
    },
    {
        label: "Custom",
        value: "custom",
        disabled: true
    },
];

type PeriodSelectorProps = {
    onPeriodSelectChange: (from: string, to: string) => void
}

export function PeriodSelector({onPeriodSelectChange}: PeriodSelectorProps) {
    const [selectedPeriodType, setSelectedPeriodType] = useState("month")

    function onRadioSelectChange() {

    }

    function onRangeSelectChange(range: any) {

    }

    return (
        <Space>
            <Radio.Group defaultValue={"month"} onChange={() => onRadioSelectChange()}
                         options={dateSelectionOptions} optionType={"button"} buttonStyle={"solid"}/>
            {selectedPeriodType == "custom" &&
                <RangePicker disabled format={"ddd, MMM do"} onChange={(range) => onRangeSelectChange(range)}/>
            }
        </Space>
    )
}