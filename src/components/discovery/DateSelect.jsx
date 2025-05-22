import React, { useEffect, useState } from "react";
import "../../styles/discovery/recDate.css";

export default function DateSelect(props) {
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);

    const minYear = 2004;
    const maxYear = oneWeekAgo.getFullYear();

    const [selectedYear, setSelectedYear] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedWeek, setSelectedWeek] = useState("");
    const [weeksInMonth, setWeeksInMonth] = useState([]);

    const years = Array.from(
        { length: maxYear - minYear + 1 },
        (_, i) => minYear + i
    );

    const months = selectedYear
        ? Array.from({ length: 12 }, (_, i) => i + 1).filter((month) => {
              const selected = Number(selectedYear);
              if (selected === maxYear) {
                  return month <= oneWeekAgo.getMonth() + 1;
              }
              return true;
          })
        : [];

    const getWeeksInMonth = (year, month) => {
        const firstDay = new Date(year, month - 1, 1).getDay();
        const totalDays = new Date(year, month, 0).getDate();

        let weeks = Math.ceil((firstDay + totalDays) / 7);

        if (year === maxYear && month === oneWeekAgo.getMonth() + 1) {
            const lastAllowedDate = oneWeekAgo.getDate();
            const totalVisibleDays = firstDay + lastAllowedDate;
            weeks = Math.ceil(totalVisibleDays / 7);
        }

        return weeks;
    };
    const getWeekStartDate = (year, month, weekNumber) => {
        const firstDayOfMonth = new Date(year, month - 1, 1);
        const dayOfWeek = firstDayOfMonth.getDay(); // 요일 (0 = 일요일)

        const offset = (weekNumber - 1) * 7 - dayOfWeek;
        const firstDate = new Date(year, month - 1, 1 + offset);

        return firstDate;
    };

    const submitDate = () => {
        const dateObj = getWeekStartDate(
            Number(selectedYear),
            Number(selectedMonth),
            Number(selectedWeek)
        );

        const yyyy = dateObj.getFullYear();
        const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
        const dd = String(dateObj.getDate()).padStart(2, "0");
        const formattedDate = `${yyyy}${mm}${dd}`; // ← 여기서 20220101 형태로 만듦

        props.setDate({
            year: selectedYear,
            month: selectedMonth,
            week: selectedWeek,
            day: formattedDate, // ← 날짜 문자열로 전달
        });

        props.setIsSubmit(true);
    };

    useEffect(() => {
        if (selectedYear && selectedMonth) {
            const totalWeeks = getWeeksInMonth(
                Number(selectedYear),
                Number(selectedMonth)
            );
            setWeeksInMonth(
                Array.from({ length: totalWeeks }, (_, i) => i + 1)
            );

            // 현재 선택된 주차가 최대 주차보다 크면 조정
            if (selectedWeek > totalWeeks) {
                setSelectedWeek("");
            }
        } else {
            setWeeksInMonth([]);
            setSelectedWeek("");
        }
    }, [selectedYear, selectedMonth]);

    useEffect(()=>{
        if(selectedWeek.length > 0){
            submitDate();
        }
    }, [selectedWeek])

    return (
        <div className="recDate-container">
            <select
                className="container-select"
                size="5"
                value={selectedYear}
                onChange={(e) => {
                    setSelectedYear(e.target.value);
                    setSelectedMonth("");
                    setSelectedWeek("");
                }}
            >
                <option value="">연도</option>
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
            <select
                className="container-select"
                size="5"
                value={selectedMonth}
                onChange={(e) => {
                    setSelectedMonth(e.target.value);
                    setSelectedWeek("");
                }}
                disabled={!selectedYear}
            >
                <option value="">월</option>
                {months.map((month) => (
                    <option key={month} value={month}>
                        {month}
                    </option>
                ))}
            </select>
            <select
                className="container-select"
                size="5"
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
                disabled={!selectedMonth}
            >
                <option value="">주차</option>
                {weeksInMonth.map((week) => (
                    <option key={week} value={week}>
                        {week}주차
                    </option>
                ))}
            </select>
        </div>
    );
}
