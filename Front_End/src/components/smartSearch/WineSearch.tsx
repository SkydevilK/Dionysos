import React, { useState } from 'react';
import './css/common.css';
import './css/reset.css';
import {Link} from "react-router-dom";
import SmartSearchList from "../SearchList/List";
/**
 * @author 김병인
 */
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { rootState } from '../../../stores/login/store';
import { getSmartSearch, getSmartSearchByName} from '../../../stores/smartSearch/actions/wineInfo';


import { Table } from 'antd';
export default function WineSearch() {
 
    const[search, setSearch] = useState('');
    const [state, setState] = useState( { country : '', type : '', sparkling: false, sweet : 0, alcohol : 0});

    const [countryRadioCt00, setCountyRadioCt00] = useState(true);
    const [countryRadioCt01, setCountyRadioCt01] = useState(false);
    const [countryRadioCt02, setCountyRadioCt02] = useState(false);
    const [countryRadioCt03, setCountyRadioCt03] = useState(false);
    const [countryRadioCt04, setCountyRadioCt04] = useState(false);
    const [countryRadioCt05, setCountyRadioCt05] = useState(false);
    const [countryRadioCt06, setCountyRadioCt06] = useState(false);
    const [countryRadioCt07, setCountyRadioCt07] = useState(false);
    const [countryRadioCt08, setCountyRadioCt08] = useState(false);
    const [countryRadioCt09, setCountyRadioCt09] = useState(false);
    const [countryRadioCt10, setCountyRadioCt10] = useState(false);
    const [countryRadioCt11, setCountyRadioCt11] = useState(false);
    const [countryRadioCt12, setCountyRadioCt12] = useState(false);
    const [colorRadio01, setColorRadio01] = useState(false);
    const [colorRadio02, setColorRadio02] = useState(false);
    const [colorRadio03, setColorRadio03] = useState(false);
    const [sparklingRadio01, setSparklingRadio01] = useState(false);
    const [sparklingRadio02, setSparklingRadio02] = useState(false);
    const [sweetRadio01, setSweetRadio01] = useState(false);
    const [sweetRadio02, setSweetRadio02] = useState(false);
    const [sweetRadio03, setSweetRadio03] = useState(false);
    const [alcoholRadio01, setAlcoholRadio01] = useState(true);
    const [alcoholRadio02, setAlcoholRadio02] = useState(false);
    const [alcoholRadio03, setAlcoholRadio03] = useState(false);
    const [alcoholRadio04, setAlcoholRadio04] = useState(false);
    const [alcoholRadio05, setAlcoholRadio05] = useState(false);
    const handleCountryRadioCt00 = () => {
        setCountyRadioCt00(true);
        setCountyRadioCt01(false);
        setCountyRadioCt02(false);
        setCountyRadioCt03(false);
        setCountyRadioCt04(false);
        setCountyRadioCt05(false);
        setCountyRadioCt06(false);
        setCountyRadioCt07(false);
        setCountyRadioCt08(false);
        setCountyRadioCt09(false);
        setCountyRadioCt10(false);
        setCountyRadioCt11(false);
        setCountyRadioCt12(false);

        setState({
                country : 'all', type : state.type, sparkling: state.sparkling, sweet : state.sweet, alcohol : state.alcohol
            })
          
    };
    const handleCountryRadioCt01 = () => {
        setCountyRadioCt00(false);
        setCountyRadioCt01(true);
        setCountyRadioCt02(false);
        setCountyRadioCt03(false);
        setCountyRadioCt04(false);
        setCountyRadioCt05(false);
        setCountyRadioCt06(false);
        setCountyRadioCt07(false);
        setCountyRadioCt08(false);
        setCountyRadioCt09(false);
        setCountyRadioCt10(false);
        setCountyRadioCt11(false);
        setCountyRadioCt12(false);
        setState({
            country : 'France', type : state.type, sparkling: state.sparkling, sweet : state.sweet, alcohol : state.alcohol
        })
    };
    const handleCountryRadioCt02 = () => {
        setCountyRadioCt00(false);
        setCountyRadioCt01(false);
        setCountyRadioCt02(true);
        setCountyRadioCt03(false);
        setCountyRadioCt04(false);
        setCountyRadioCt05(false);
        setCountyRadioCt06(false);
        setCountyRadioCt07(false);
        setCountyRadioCt08(false);
        setCountyRadioCt09(false);
        setCountyRadioCt10(false);
        setCountyRadioCt11(false);
        setCountyRadioCt12(false);
        setState({
            country : 'Italy', type : state.type, sparkling: state.sparkling, sweet : state.sweet, alcohol : state.alcohol
        })
    };
    const handleCountryRadioCt03 = () => {
        setCountyRadioCt00(false);
        setCountyRadioCt01(false);
        setCountyRadioCt02(false);
        setCountyRadioCt03(true);
        setCountyRadioCt04(false);
        setCountyRadioCt05(false);
        setCountyRadioCt06(false);
        setCountyRadioCt07(false);
        setCountyRadioCt08(false);
        setCountyRadioCt09(false);
        setCountyRadioCt10(false);
        setCountyRadioCt11(false);
        setCountyRadioCt12(false);
        setState({
            country : 'Spain', type : state.type, sparkling: state.sparkling, sweet : state.sweet, alcohol : state.alcohol
        })
    };
    const handleCountryRadioCt04 = () => {
        setCountyRadioCt00(false);
        setCountyRadioCt01(false);
        setCountyRadioCt02(false);
        setCountyRadioCt03(false);
        setCountyRadioCt04(true);
        setCountyRadioCt05(false);
        setCountyRadioCt06(false);
        setCountyRadioCt07(false);
        setCountyRadioCt08(false);
        setCountyRadioCt09(false);
        setCountyRadioCt10(false);
        setCountyRadioCt11(false);
        setCountyRadioCt12(false);
        setState({
            country : 'Germany', type : state.type, sparkling: state.sparkling, sweet : state.sweet, alcohol : state.alcohol
        })
    };
    const handleCountryRadioCt05 = () => {
        setCountyRadioCt00(false);
        setCountyRadioCt01(false);
        setCountyRadioCt02(false);
        setCountyRadioCt03(false);
        setCountyRadioCt04(false);
        setCountyRadioCt05(true);
        setCountyRadioCt06(false);
        setCountyRadioCt07(false);
        setCountyRadioCt08(false);
        setCountyRadioCt09(false);
        setCountyRadioCt10(false);
        setCountyRadioCt11(false);
        setCountyRadioCt12(false);
        setState({
            country : 'USA', type : state.type, sparkling: state.sparkling, sweet : state.sweet, alcohol : state.alcohol
        })
    };
    const handleCountryRadioCt06 = () => {
        setCountyRadioCt00(false);
        setCountyRadioCt01(false);
        setCountyRadioCt02(false);
        setCountyRadioCt03(false);
        setCountyRadioCt04(false);
        setCountyRadioCt05(false);
        setCountyRadioCt06(true);
        setCountyRadioCt07(false);
        setCountyRadioCt08(false);
        setCountyRadioCt09(false);
        setCountyRadioCt10(false);
        setCountyRadioCt11(false);
        setCountyRadioCt12(false);
        setState({
            country : 'Chile', type : state.type, sparkling: state.sparkling, sweet : state.sweet, alcohol : state.alcohol
        })
    };
    const handleCountryRadioCt07 = () => {
        setCountyRadioCt00(false);
        setCountyRadioCt01(false);
        setCountyRadioCt02(false);
        setCountyRadioCt03(false);
        setCountyRadioCt04(false);
        setCountyRadioCt05(false);
        setCountyRadioCt06(false);
        setCountyRadioCt07(true);
        setCountyRadioCt08(false);
        setCountyRadioCt09(false);
        setCountyRadioCt10(false);
        setCountyRadioCt11(false);
        setCountyRadioCt12(false);
        setState({
            country : 'Australia', type : state.type, sparkling: state.sparkling, sweet : state.sweet, alcohol : state.alcohol
        })
    };
    const handleCountryRadioCt08 = () => {
        setCountyRadioCt00(false);
        setCountyRadioCt01(false);
        setCountyRadioCt02(false);
        setCountyRadioCt03(false);
        setCountyRadioCt04(false);
        setCountyRadioCt05(false);
        setCountyRadioCt06(false);
        setCountyRadioCt07(false);
        setCountyRadioCt08(true);
        setCountyRadioCt09(false);
        setCountyRadioCt10(false);
        setCountyRadioCt11(false);
        setCountyRadioCt12(false);
        setState({
            country : 'Canada', type : state.type, sparkling: state.sparkling, sweet : state.sweet, alcohol : state.alcohol
        })
    };
    const handleCountryRadioCt09 = () => {
        setCountyRadioCt00(false);
        setCountyRadioCt01(false);
        setCountyRadioCt02(false);
        setCountyRadioCt03(false);
        setCountyRadioCt04(false);
        setCountyRadioCt05(false);
        setCountyRadioCt06(false);
        setCountyRadioCt07(false);
        setCountyRadioCt08(false);
        setCountyRadioCt09(true);
        setCountyRadioCt10(false);
        setCountyRadioCt11(false);
        setCountyRadioCt12(false);
        setState({
            country : 'New Zealand', type : state.type, sparkling: state.sparkling, sweet : state.sweet, alcohol : state.alcohol
        })
    };
    const handleCountryRadioCt10 = () => {
        setCountyRadioCt00(false);
        setCountyRadioCt01(false);
        setCountyRadioCt02(false);
        setCountyRadioCt03(false);
        setCountyRadioCt04(false);
        setCountyRadioCt05(false);
        setCountyRadioCt06(false);
        setCountyRadioCt07(false);
        setCountyRadioCt08(false);
        setCountyRadioCt09(false);
        setCountyRadioCt10(true);
        setCountyRadioCt11(false);
        setCountyRadioCt12(false);
        setState({
            country : 'Argentina', type : state.type, sparkling: state.sparkling, sweet : state.sweet, alcohol : state.alcohol
        })
    };
    const handleCountryRadioCt11 = () => {
        setCountyRadioCt00(false);
        setCountyRadioCt01(false);
        setCountyRadioCt02(false);
        setCountyRadioCt03(false);
        setCountyRadioCt04(false);
        setCountyRadioCt05(false);
        setCountyRadioCt06(false);
        setCountyRadioCt07(false);
        setCountyRadioCt08(false);
        setCountyRadioCt09(false);
        setCountyRadioCt10(false);
        setCountyRadioCt11(true);
        setCountyRadioCt12(false);
        setState({
            country : 'RSA', type : state.type, sparkling: state.sparkling, sweet : state.sweet, alcohol : state.alcohol
        })
    };
    const handleCountryRadioCt12 = () => {
        setCountyRadioCt00(false);
        setCountyRadioCt01(false);
        setCountyRadioCt02(false);
        setCountyRadioCt03(false);
        setCountyRadioCt04(false);
        setCountyRadioCt05(false);
        setCountyRadioCt06(false);
        setCountyRadioCt07(false);
        setCountyRadioCt08(false);
        setCountyRadioCt09(false);
        setCountyRadioCt10(false);
        setCountyRadioCt11(false);
        setCountyRadioCt12(true);
        setState({
            country : 'Korea', type : state.type, sparkling: state.sparkling, sweet : state.sweet, alcohol : state.alcohol
        })
    }; 
    const handleColorRadio01 = () => {
        setColorRadio01(true);
        setColorRadio02(false);
        setColorRadio03(false);
        setState({
            country : state.country, type : 'Red', sparkling: state.sparkling, sweet : state.sweet, alcohol : state.alcohol
        })
    }
    const handleColorRadio02 = () => {
        setColorRadio01(false);
        setColorRadio02(true);
        setColorRadio03(false);
        setState({
            country : state.country, type : 'Rose', sparkling: state.sparkling, sweet : state.sweet, alcohol : state.alcohol
        })
    }
    const handleColorRadio03 = () => {
        setColorRadio01(false);
        setColorRadio02(false);
        setColorRadio03(true);
        setState({
            country : state.country, type : 'White', sparkling: state.sparkling, sweet : state.sweet, alcohol : state.alcohol
        })
    }
    const handleSparklingRadio01 = () => {
        setSparklingRadio01(true);
        setSparklingRadio02(false);
        setState({
            country : state.country, type : state.type, sparkling: true, sweet : state.sweet, alcohol : state.alcohol
        })
    }
    const handleSparklingRadio02 = () => {
        setSparklingRadio01(false);
        setSparklingRadio02(true);
        setState({
            country : state.country, type : state.type, sparkling: false, sweet : state.sweet, alcohol : state.alcohol
        })
    }
    const handleSweetRadio01 = () => {
        setSweetRadio01(true);
        setSweetRadio02(false);
        setSweetRadio03(false);
        setState({
            country : state.country, type : state.type, sparkling: state.sparkling, sweet : 5, alcohol : state.alcohol
        })
    }
    const handleSweetRadio02 = () => {
        setSweetRadio01(false);
        setSweetRadio02(true);
        setSweetRadio03(false);
        setState({
            country : state.country, type : state.type, sparkling: state.sparkling, sweet : 3, alcohol : state.alcohol
        })
    }
    const handleSweetRadio03 = () => {
        setSweetRadio01(false);
        setSweetRadio02(false);
        setSweetRadio03(true);
        setState({
            country : state.country, type : state.type, sparkling: state.sparkling, sweet : 1, alcohol : state.alcohol
        })
    }
    const handleAlcoholRadio01 = () => {
        setAlcoholRadio01(true);
        setAlcoholRadio02(false);
        setAlcoholRadio03(false);
        setAlcoholRadio04(false);
        setAlcoholRadio05(false);
        setState({
            country : state.country, type : state.type, sparkling: state.sparkling, sweet : state.sweet, alcohol : 0
        })
    }
    const handleAlcoholRadio02 = () => {
        setAlcoholRadio01(false);
        setAlcoholRadio02(true);
        setAlcoholRadio03(false);
        setAlcoholRadio04(false);
        setAlcoholRadio05(false);
        setState({
            country : state.country, type : state.type, sparkling: state.sparkling, sweet : state.sweet, alcohol : 5
        })
    }
    const handleAlcoholRadio03 = () => {
        setAlcoholRadio01(false);
        setAlcoholRadio02(false);
        setAlcoholRadio03(true);
        setAlcoholRadio04(false);
        setAlcoholRadio05(false);
        setState({
            country : state.country, type : state.type, sparkling: state.sparkling, sweet : state.sweet, alcohol : 10
        })
    }
    const handleAlcoholRadio04 = () => {
        setAlcoholRadio01(false);
        setAlcoholRadio02(false);
        setAlcoholRadio03(false);
        setAlcoholRadio04(true);
        setAlcoholRadio05(false);
        setState({
            country : state.country, type : state.type, sparkling: state.sparkling, sweet : state.sweet, alcohol : 15
        })
    }
    const handleAlcoholRadio05 = () => {
        setAlcoholRadio01(false);
        setAlcoholRadio02(false);
        setAlcoholRadio03(false);
        setAlcoholRadio04(false);
        setAlcoholRadio05(true);
        setState({
            country : state.country, type : state.type, sparkling: state.sparkling, sweet : state.sweet, alcohol : 20
        })
    }
    function handleClick(e: any) {
        e.preventDefault();
    }

    function searchTaste(e: any) {
        e.preventDefault();
    }


    return (
        <div id="wrap" className="main">
            <div id="header"
                style={{ position: "relative", top: "0px", left: "0px" }}>
                <section id="bx_smart_search" className="open" style={{ top: "0px", opacity: "1" }}>
                    <div className="smart_inner">
                        <div className="smart_cont_wrap">
                            <div id="expert" className="bx_cont" style={{ display: "block" }}>
                                <div className="smart_tit">
                                    <Link to="/ranking">
                                    <span style={{display:"inline-block" }} id="home2">
                                    <img src="https://image.flaticon.com/icons/svg/834/834179.svg" alt="" />
                                    </span>
                                    </Link>
                                    <h2 style={{color : 'white', display:"inline-block"}}>A Guide to Wine Tasting</h2> <span>와인 취향 찾기</span>
                                </div>
                                <div className="smart_cont">
                                    {/* <form action="/wine/mine" method="post"> */}
                                    <div className="ss_search clfix">
                                        <div className="ss_search_form">
                                            <span className="ip_txt">
                                                <input type="text" name="name-apply" id="expert-name-apply" title="와인명을 입력" placeholder="와인명을 입력하세요." data-required="와인명을 입력하세요." 
                                                                onChange={e =>
                                                                    setSearch(e.target.value)
                                                                  }
                                                                  value={search}
                                                
                                                />
                                            </span> </div>
                                      
                                                                                <Link to={{pathname: '/searchList',
  state: {
    name : search
  }
}}  className="btns btn_wine_search" id="expert-by-name">
                                            <span className="ico glass"></span>
                                            와인명 검색
                                        </Link>
                                        <p>* 하단 와인 속성 항목과 무관하게 와인명만 검색 가능합니다.</p>
                                    </div>
                                    {/* </form> */}
                                    <div className="expert_wrap">
                                        <div className="step clfix pdb15">
                                            <div className="country_radio_wrap">
                                                <h3 style={{color : 'white'}}>Country</h3>
                                                <div className="country_radio">
                                                    <span className="input_radio ui_complete">
                                                        <input type="radio" id="ct00" name="e_country" defaultChecked className="_default-option " onChange={handleCountryRadioCt00} value="" data-hash="전체 국가" />
                                                        {
                                                            countryRadioCt00 === true ?
                                                                (<label htmlFor="ct00" className="ct01">
                                                                    <span className="radio_checked"></span>
                                                                    <em>전체</em>
                                                                </label>) : (<label htmlFor="ct00" className="ct01">
                                                                    <span className="radio_basic"></span>
                                                                    <em>전체</em>
                                                                </label>)
                                                        }
                                                    </span>
                                                    <span className="input_radio ui_complete">
                                                        <input type="radio" id="ct01" name="e_country" className=" " value="france" onChange={handleCountryRadioCt01} />
                                                        {
                                                            countryRadioCt01 === true ?
                                                                (<label htmlFor="ct01" className="ct02">
                                                                    <span className="radio_checked"></span>
                                                                    <em>프랑스</em>
                                                                </label>
                                                                )
                                                                : (<label htmlFor="ct01" className="ct02">
                                                                    <span className="radio_basic"></span>
                                                                    <em>프랑스</em>
                                                                </label>
                                                                )
                                                        }
                                                    </span>
                                                    <span className="input_radio ui_complete">
                                                        <input type="radio" id="ct02" name="e_country" className=" " value="italy" onChange={handleCountryRadioCt02} />
                                                        {
                                                            countryRadioCt02 === true ?
                                                                (<label htmlFor="ct02" className="ct03">
                                                                    <span className="radio_checked"></span>
                                                                    <em>이탈리아</em>
                                                                </label>)
                                                                :
                                                                (<label htmlFor="ct02" className="ct03">
                                                                    <span className="radio_basic"></span>
                                                                    <em>이탈리아</em>
                                                                </label>)
                                                        }
                                                    </span>
                                                    <span className="input_radio ui_complete">
                                                        <input type="radio" id="ct03" name="e_country" className=" " value="spain" onChange={handleCountryRadioCt03} />
                                                        {
                                                            countryRadioCt03 === true ?
                                                                (<label htmlFor="ct03" className="ct04">
                                                                    <span className="radio_checked"></span>
                                                                    <em>스페인</em>
                                                                </label>)
                                                                : (<label htmlFor="ct03" className="ct04">
                                                                    <span className="radio_basic"></span>
                                                                    <em>스페인</em>
                                                                </label>)
                                                        }
                                                    </span>
                                                    <span className="input_radio ui_complete">
                                                        <input type="radio" id="ct04" name="e_country" className=" " value="germany" onChange={handleCountryRadioCt04} />
                                                        {
                                                            countryRadioCt04 === true ?
                                                                (<label htmlFor="ct04" className="ct05">
                                                                    <span className="radio_checked">
                                                                    </span>
                                                                    <em>독일</em>
                                                                </label>)
                                                                :
                                                                (<label htmlFor="ct04" className="ct05">
                                                                    <span className="radio_basic">
                                                                    </span>
                                                                    <em>독일</em>
                                                                </label>)
                                                        }
                                                    </span>
                                                    <span className="input_radio ui_complete">
                                                        <input type="radio" id="ct05" name="e_country" className=" " value="usa" onChange={handleCountryRadioCt05} />
                                                        {
                                                            countryRadioCt05 === true ?
                                                                (<label htmlFor="ct05" className="ct06">
                                                                    <span className="radio_checked"></span>
                                                                    <em>미국</em>
                                                                </label>)
                                                                :
                                                                (<label htmlFor="ct05" className="ct06">
                                                                    <span className="radio_basic"></span>
                                                                    <em>미국</em>
                                                                </label>)
                                                        }
                                                    </span>
                                                    <span className="input_radio ui_complete">
                                                        <input type="radio" id="ct06" name="e_country" className=" " value="chile" onChange={handleCountryRadioCt06} />
                                                        {
                                                            countryRadioCt06 === true ?
                                                                (<label htmlFor="ct06" className="ct07">
                                                                    <span className="radio_checked"></span>
                                                                    <em>칠레</em>
                                                                </label>)
                                                                :
                                                                (<label htmlFor="ct06" className="ct07">
                                                                    <span className="radio_basic"></span>
                                                                    <em>칠레</em>
                                                                </label>)
                                                        }
                                                    </span>
                                                    <span className="input_radio ui_complete">
                                                        <input type="radio" id="ct07" name="e_country" className=" " value="australia" onChange={handleCountryRadioCt07} />
                                                        {
                                                            countryRadioCt07 === true ?
                                                                (<label htmlFor="ct07" className="ct08">
                                                                    <span className="radio_checked"></span>
                                                                    <em>호주</em>
                                                                </label>)
                                                                :
                                                                (<label htmlFor="ct07" className="ct08">
                                                                    <span className="radio_basic"></span>
                                                                    <em>호주</em>
                                                                </label>)
                                                        }
                                                    </span>
                                                    <span className="input_radio ui_complete">
                                                        <input type="radio" id="ct08" name="e_country" className=" " value="canada" onChange={handleCountryRadioCt08} />
                                                        {
                                                            countryRadioCt08 === true ?
                                                                (<label htmlFor="ct08" className="ct09">
                                                                    <span className="radio_checked"></span>
                                                                    <em>캐나다</em>
                                                                </label>)
                                                                :
                                                                (<label htmlFor="ct08" className="ct09">
                                                                    <span className="radio_basic"></span>
                                                                    <em>캐나다</em>
                                                                </label>)
                                                        }
                                                    </span>
                                                    <span className="input_radio ui_complete">
                                                        <input type="radio" id="ct09" name="e_country" className=" " value="new_zealand" onChange={handleCountryRadioCt09} />
                                                        {
                                                            countryRadioCt09 === true ?
                                                                (<label htmlFor="ct09" className="ct10">
                                                                    <span className="radio_checked"></span>
                                                                    <em>뉴질랜드</em>
                                                                </label>)
                                                                :
                                                                (<label htmlFor="ct09" className="ct10">
                                                                    <span className="radio_basic"></span>
                                                                    <em>뉴질랜드</em>
                                                                </label>)
                                                        }
                                                    </span>
                                                    <span className="input_radio ui_complete">
                                                        <input type="radio" id="ct10" name="e_country" className=" " value="argentina" onChange={handleCountryRadioCt10} />
                                                        {
                                                            countryRadioCt10 === true ?
                                                                (<label htmlFor="ct10" className="ct11">
                                                                    <span className="radio_checked"></span>
                                                                    <em>아르헨티나</em>
                                                                </label>)
                                                                :
                                                                (<label htmlFor="ct10" className="ct11">
                                                                    <span className="radio_basic"></span>
                                                                    <em>아르헨티나</em>
                                                                </label>)
                                                        }
                                                    </span>
                                                    <span className="input_radio ui_complete">
                                                        <input type="radio" id="ct11" name="e_country" className=" " value="south_africa" onChange={handleCountryRadioCt11} />
                                                        {
                                                            countryRadioCt11 === true ?
                                                                (<label htmlFor="ct11" className="ct12">
                                                                    <span className="radio_checked"></span>
                                                                    <em>남아공</em>
                                                                </label>)
                                                                :
                                                                (<label htmlFor="ct11" className="ct12">
                                                                    <span className="radio_basic"></span>
                                                                    <em>남아공</em>
                                                                </label>)
                                                        }
                                                    </span>
                                                    <span className="input_radio ui_complete">
                                                        <input type="radio" id="ct12" name="e_country" className=" " value="korea" onChange={handleCountryRadioCt12} />
                                                        {
                                                            countryRadioCt12 ?
                                                                (<label htmlFor="ct12" className="ct13">
                                                                    <span className="radio_checked"></span>
                                                                    <em>한국</em>
                                                                </label>)
                                                                :
                                                                (<label htmlFor="ct12" className="ct13">
                                                                    <span className="radio_basic"></span>
                                                                    <em>한국</em>
                                                                </label>)
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="step clfix">
                                            <h3 style={{color : 'white'}}>Wine Type</h3>
                                            <div className="wine_radio_wrap wrap01">
                                                <h4 id="id_color">와인 종류</h4>
                                                <div>
                                                    <span className="input_radio ui_complete">
                                                        <input type="radio" id="wt00" name="e_color" className=" " value="red" onChange={handleColorRadio01} />
                                                        {
                                                            colorRadio01 === true ?
                                                                (<label htmlFor="wt00" className="ty01">
                                                                    <span className="radio_checked"></span>
                                                                    <em>Red</em>
                                                                </label>)
                                                                :
                                                                (<label htmlFor="wt00" className="ty01">
                                                                    <span className="radio_basic"></span>
                                                                    <em>Red</em>
                                                                </label>)
                                                        }
                                                    </span>
                                                    <span className="input_radio ui_complete">
                                                        <input type="radio" id="wt01" name="e_color" className=" " value="rose" onChange={handleColorRadio02} />
                                                        {
                                                            colorRadio02 === true ?
                                                                (<label htmlFor="wt01" className="ty02">
                                                                    <span className="radio_checked">
                                                                    </span>
                                                                    <em>Rose</em>
                                                                </label>)
                                                                :
                                                                (<label htmlFor="wt01" className="ty02">
                                                                    <span className="radio_basic">
                                                                    </span>
                                                                    <em>Rose</em>
                                                                </label>)
                                                        }
                                                    </span>
                                                    <span className="input_radio ui_complete">
                                                        <input type="radio" id="wt02" name="e_color" className=" " value="white" onChange={handleColorRadio03} />
                                                        {
                                                            colorRadio03 === true ?
                                                                (<label htmlFor="wt02" className="ty03">
                                                                    <span className="radio_checked"></span>
                                                                    <em>White</em>
                                                                </label>)
                                                                :
                                                                (<label htmlFor="wt02" className="ty03">
                                                                    <span className="radio_basic"></span>
                                                                    <em>White</em>
                                                                </label>)
                                                        }
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="wine_radio_wrap wrap02">
                                                <h4 id="id_color">탄산 종류</h4>
                                                <div> <span className="input_radio ui_complete">
                                                    <input type="radio" id="sp00" name="e_sparkling" className=" " value="still" onChange={handleSparklingRadio01} />
                                                    {
                                                        sparklingRadio01 === true ?
                                                            (<label htmlFor="sp00" className="sp01">
                                                                <span className="radio_checked"></span>
                                                                <em>Still</em>
                                                            </label>)
                                                            :
                                                            (<label htmlFor="sp00" className="sp01">
                                                                <span className="radio_basic"></span>
                                                                <em>Still</em>
                                                            </label>)
                                                    }
                                                </span>
                                                    <span className="input_radio ui_complete">
                                                        <input type="radio" id="sp01" name="e_sparkling" className=" " value="sparkling" onChange={handleSparklingRadio02} />
                                                        {
                                                            sparklingRadio02 === true ?
                                                                (<label htmlFor="sp01" className="sp02">
                                                                    <span className="radio_checked"></span>
                                                                    <em>Sparkling</em>
                                                                </label>)
                                                                :
                                                                (<label htmlFor="sp01" className="sp02">
                                                                    <span className="radio_basic"></span>
                                                                    <em>Sparkling</em>
                                                                </label>)
                                                        }
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="wine_radio_wrap wrap03">
                                                <h4 id="id_color">당도 종류</h4>
                                                <div>
                                                    <span className="input_radio ui_complete">
                                                        <input type="radio" id="sw00" name="e_sweet" className=" " value="sweet" onChange={handleSweetRadio01} />
                                                        {
                                                            sweetRadio01 === true ?
                                                                (<label htmlFor="sw00" className="sw01">
                                                                    <span className="radio_checked"></span>
                                                                    <em>Sweet</em>
                                                                </label>)
                                                                :
                                                                (<label htmlFor="sw00" className="sw01">
                                                                    <span className="radio_basic"></span>
                                                                    <em>Sweet</em>
                                                                </label>)
                                                        }
                                                    </span>
                                                    <span className="input_radio ui_complete">
                                                        <input type="radio" id="sw01" name="e_sweet" className=" " value="normal" onChange={handleSweetRadio02} />
                                                        {
                                                            sweetRadio02 === true ?
                                                                (<label htmlFor="sw01" className="sw02">
                                                                    <span className="radio_checked"></span>
                                                                    <em>Normal</em>
                                                                </label>)
                                                                :
                                                                (<label htmlFor="sw01" className="sw02">
                                                                    <span className="radio_basic"></span>
                                                                    <em>Normal</em>
                                                                </label>)
                                                        }
                                                    </span>
                                                    <span className="input_radio ui_complete">
                                                        <input type="radio" id="sw02" name="e_sweet" className=" " value="dry" onChange={handleSweetRadio03} />
                                                        {
                                                            sweetRadio03 === true ?
                                                                (<label htmlFor="sw02" className="sw03">
                                                                    <span className="radio_checked"></span>
                                                                    <em>Dry</em>
                                                                </label>)
                                                                :
                                                                (<label htmlFor="sw02" className="sw03">
                                                                    <span className="radio_basic"></span>
                                                                    <em>Dry</em>
                                                                </label>)
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="step clfix bdb0">
                                            <h3 style={{color : 'white'}}>Detail</h3>
                                            <div className="detail_radio_wrap01">
                                                <h4 id="id_color">알코올 도수</h4>
                                                <div className="detail_radio">
                                                    {
                                                        alcoholRadio01 === true ?
                                                            (<div className="step_bar step01"></div>)
                                                            : (null)
                                                    }
                                                    {
                                                        alcoholRadio02 === true ?
                                                            (<div className="step_bar step02"></div>)
                                                            : (null)
                                                    }
                                                    {
                                                        alcoholRadio03 === true ?
                                                            (<div className="step_bar step03"></div>)
                                                            : (null)
                                                    }
                                                    {
                                                        alcoholRadio04 === true ?
                                                            (<div className="step_bar step04"></div>)
                                                            : (null)
                                                    }
                                                    {
                                                        alcoholRadio05 === true ?
                                                            (<div className="step_bar step05"></div>)
                                                            : (null)
                                                    }
                                                    <div className="step_radio">
                                                        <input type="radio" id="al00" name="e_alcohol" className="pointer01 " value="0" onChange={handleAlcoholRadio01} />
                                                        {
                                                            alcoholRadio01 === true ?
                                                                (<label htmlFor="al00" className="on">0%</label>)
                                                                :
                                                                (<label htmlFor="al00" className="">0%</label>)
                                                        }
                                                        <input type="radio" id="al01" name="e_alcohol" className="pointer02 " value="5" data-hash="~5%" onChange={handleAlcoholRadio02} />
                                                        {
                                                            alcoholRadio02 === true ?
                                                                (<label htmlFor="al01" className="on">5%</label>)
                                                                :
                                                                (<label htmlFor="al01" className="">5%</label>)
                                                        }
                                                        <input type="radio" id="al02" name="e_alcohol" className="pointer03 " value="10" data-hash="~10%" onChange={handleAlcoholRadio03} />
                                                        {
                                                            alcoholRadio03 === true ?
                                                                (<label htmlFor="al02" className="on">10%</label>)
                                                                :
                                                                (<label htmlFor="al02" className="">10%</label>)
                                                        }
                                                        <input type="radio" id="al03" name="e_alcohol" className="pointer04 " value="15" data-hash="~15%" onChange={handleAlcoholRadio04} />
                                                        {
                                                            alcoholRadio04 === true ?
                                                                (<label htmlFor="al03" className="on">15%</label>)
                                                                :
                                                                (<label htmlFor="al03" className="">15%</label>)
                                                        }
                                                        <input type="radio" id="al04" name="e_alcohol" className="pointer05 _default-option" value="20" data-hash="~20%" onChange={handleAlcoholRadio05} />
                                                        {
                                                            alcoholRadio05 === true ?
                                                                (<label htmlFor="al04" className="on">20%</label>)
                                                                :
                                                                (<label htmlFor="al04" className="">20%</label>)
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Link to={{pathname: '/searchList',
  state: {
    taste : state
  }
}} style={{marginLeft : '82%'}} className="btns btn_wine_search" id="expert-by-name">
                                            <button><span className="ico glass"></span>내게 맞는 와인 검색</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </section>
            </div>
        </div>
    );
}