import React, { useState } from "react";
import backImgsrc from "/images/recSituationBackground.png";
import "../../styles/home/recDate.css";
import movieDummy from "../../../public/data/movieDummy";
import DateSelect from "./DateSelect";
import MovieList from "../MovieList";

export default function RecDate() {
    const [isSubmit, setIsSubmit] = useState(false);
    const [inputDate, setDate] = useState();

    return (
        <>
            {isSubmit ? (
                <div className="home-recResult">
                    <div className="recResult-title">
                        <p className="title-system">그 시절 박스오피스: </p>
                        <p className="title-user">
                            {`${inputDate.year}년 ${inputDate.month}월 ${inputDate.week}주차`}
                        </p>
                    </div>
                    <MovieList movieList={movieDummy} />
                </div>
            ) : (
                <div
                    className="home-recDate"
                    style={{ backgroundImage: `url(${backImgsrc})` }}
                >
                    <p className="recDate-question">
                        Q. 확인하고 싶은 날짜를 선택해주세요!
                    </p>
                    <DateSelect setIsSubmit={setIsSubmit} setDate={setDate} />
                </div>
            )}
        </>
    );
}
