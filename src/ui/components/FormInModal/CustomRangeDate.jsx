import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

import locale from "antd/es/date-picker/locale/es_ES";

import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});

export const CustomRangeDate = ({ ...props }) => {
  return (
    <div style={{ margin: 2 }}>
      <RangePicker
        locale={locale}
        size="large"
        style={{
          // fontWeight: "bold",
          border: "2px solid #602A90",
          boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",

          // backgroundColor: "rgba(255,255,255,0.6)",
        }}
        {...props}
      />
    </div>
  );
};
