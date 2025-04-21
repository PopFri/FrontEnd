import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import '../styles/ranking/RankingPage.css';
import '../styles/common.css'
import RankingPlatform from '../components/ranking/RankingPlatform';
import RankingList from '../components/ranking/RankingList';
import RankingPeriod from '../components/ranking/RankingPeriod';

const RankingPage = () => {
    const [platform, setPlatform] = useState("popfri");
    const [rankingList, setRankingList] = useState([]);
    const [rankingPeriod, setRankingPeriod] = useState('day');

    const renderPeriodComponent = () => {
        switch (platform) {
          case "boxoffice":
            return <RankingPeriod platform={platform} rankingPeriod={rankingPeriod} setRankingPeriod={setRankingPeriod} />;
          case "popfri":
            return <RankingPeriod platform={platform} rankingPeriod={rankingPeriod} setRankingPeriod={setRankingPeriod} />;
          case "none":
          default:
            return null;
        }
    };
    const fetchRanking = async () => {
        try {
            const res = await fetch(`/data/rankingData${platform}.json`);
            const data = await res.json();
            setRankingList(data.result.ranking);
        } catch (err) {
            console.error('랭킹 데이터 불러오기 실패', err);
        }
    }

    useEffect(() => {
        fetchRanking();
    }, [platform]);

    return (
        <div className="ranking-wrapper">
            <Header />
            <div className="ranking-title">
                Top 10 Ranking
            </div>
            <RankingPlatform platform={platform} setPlatform={setPlatform} />
            {renderPeriodComponent()}
            <RankingList rankingList={rankingList} platform={platform} />
        </div>
    );
}
export default RankingPage;