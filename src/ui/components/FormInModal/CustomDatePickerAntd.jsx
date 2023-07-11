import { DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/es_ES";
// dayjs.extend(updateLocale);
// dayjs.updateLocale("en", {
//   weekStart: 1,
// });

export const CustomDatePickerAntd = ({ sxProps, ...props }) => {
  return (
    <div style={{ margin: 2 }}>
      <DatePicker
        // locale={locale}
        size="large"
        style={{
          border: "2px solid #602A90",
          boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
          ...sxProps,
        }}
        {...props}
      />
    </div>
  );
};
