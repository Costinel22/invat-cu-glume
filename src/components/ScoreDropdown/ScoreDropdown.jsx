import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import { useTranslation } from 'react-i18next';


function ScoreDropdown({ user }) {
    const [score, setScore] = useState(0);
    const [range, setRange] = useState('daily');
    const { t } = useTranslation();

    useEffect(() => {
        if (user) {
            fetchScore(range);
        }
    }, [range]);

    const fetchScore = async (type) => {
        const res = await axios.get(`/api/scores/${user.uid}?range=${type}`);
        setScore(res.data.total);
    };

    const shareScore = () => {
        const shareText = `${user.displayName} ${t('sharedScore')} (${t(range)}): ${score} ❤️`;
        navigator.clipboard.writeText(shareText);
        alert(t('copied'));
    };

    return (
        <Dropdown className="ms-3">
            <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                🎯 {t('score')}: {score}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => setRange('daily')}>{t('daily')}</Dropdown.Item>
                <Dropdown.Item onClick={() => setRange('weekly')}>{t('weekly')}</Dropdown.Item>
                <Dropdown.Item onClick={() => setRange('monthly')}>{t('monthly')}</Dropdown.Item>
                <Dropdown.Item onClick={() => setRange('total')}>{t('total')}</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={shareScore}>{t('share')}</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
export default ScoreDropdown;
