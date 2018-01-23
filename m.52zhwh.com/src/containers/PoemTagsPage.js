import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag } from 'antd-mobile';
import { browserHistory } from 'react-router';

import { Button, WingBlank, WhiteSpace } from 'antd-mobile';
import './PoemTagsPage.css';


class PoemTagPage extends Component {

    render(){
        return(
            <div>
                <div className="ptg-tag-header"> 形式 </div>
                <div className="ptg-tag-container">
                    { this.props.forms.map(item=> (
                        <Tag key={ 'item_'+item.id }
                            onChange={ ()=> {
                                console.log(item.text)
                                browserHistory.push('/poems/filter?form='+item.text)
                            }}>{ item.text }</Tag>
                    ))}
                </div>

                <div className="ptg-tag-header"> 朝代 </div>
                <div className="ptg-tag-container">
                    { this.props.dynasties.map(item=> (
                        <Tag key={ 'item_'+item.id }
                            onChange={ ()=> {
                                console.log(item.text)
                                browserHistory.push('/poems/filter?dynasty='+item.text)
                            }}>{ item.text }</Tag>
                    ))}
                </div>

                <div className="ptg-tag-header"> 类型 </div>
                <div className="ptg-tag-container">
                    { this.props.types.map(item=> (
                        <Tag key={ 'item_'+item.id }
                            onChange={ ()=> {
                                console.log(item.text)
                                browserHistory.push('/poems/filter?type='+item.text)
                            }}>{ item.text }</Tag>
                    ))}
                </div>
            </div>
        )
    }
}

PoemTagPage.defaultProps = {
    forms: [{'id': 1, 'text': '诗'}, {'id': 2, 'text': '词'}, {'id': 3, 'text': '曲'}, {'id': 4, 'text': '文言文'}],
    dynasties: [{'id': 1, 'text': '先秦'}, {'id': 2, 'text': '两汉'}, {'id': 3, 'text': '魏晋'}, {'id': 4, 'text': '南北朝'}, {'id': 5, 'text': '隋代'}, {'id': 6, 'text': '唐代'}, {'id': 7, 'text': '五代'}, {'id': 8, 'text': '宋代'}, {'id': 9, 'text': '元代'}, {'id': 10, 'text': '明代'}, {'id': 11, 'text': '清代'}],
    types: [{'id': 1, 'text': '写景'}, {'id': 2, 'text': '咏物'}, {'id': 3, 'text': '春天'}, {'id': 4, 'text': '夏天'}, {'id': 5, 'text': '秋天'}, {'id': 6, 'text': '冬天'}, {'id': 7, 'text': '写雨'}, {'id': 8, 'text': '写雪'}, {'id': 9, 'text': '写风'}, {'id': 10, 'text': '写花'}, {'id': 11, 'text': '梅花'}, {'id': 12, 'text': '荷花'}, {'id': 13, 'text': '菊花'}, {'id': 14, 'text': '柳树'}, {'id': 15, 'text': '月亮'}, {'id': 16, 'text': '山水'}, {'id': 17, 'text': '写山'}, {'id': 18, 'text': '写水'}, {'id': 19, 'text': '长江'}, {'id': 20, 'text': '黄河'}, {'id': 21, 'text': '儿童'}, {'id': 22, 'text': '写鸟'}, {'id': 23, 'text': '写马'}, {'id': 24, 'text': '田园'}, {'id': 25, 'text': '边塞'}, {'id': 26, 'text': '地名'}, {'id': 27, 'text': '抒情'}, {'id': 28, 'text': '爱国'}, {'id': 29, 'text': '离别'}, {'id': 30, 'text': '送别'}, {'id': 31, 'text': '思乡'}, {'id': 32, 'text': '爱情'}, {'id': 33, 'text': '励志'}, {'id': 34, 'text': '哲理'}, {'id': 35, 'text': '闺怨'}, {'id': 36, 'text': '悼亡'}, {'id': 37, 'text': '写人'}, {'id': 38, 'text': '老师'}, {'id': 39, 'text': '母亲'}, {'id': 40, 'text': '友情'}, {'id': 41, 'text': '战争'}, {'id': 42, 'text': '读书'}, {'id': 43, 'text': '惜时'}, {'id': 44, 'text': '婉约'}, {'id': 45, 'text': '豪放'}, {'id': 46, 'text': '诗经'}, {'id': 47, 'text': '楚辞'}, {'id': 48, 'text': '乐府'}, {'id': 49, 'text': '民谣'}, {'id': 50, 'text': '节日'}, {'id': 51, 'text': '春节'}, {'id': 52, 'text': '元宵节'}, {'id': 53, 'text': '寒食节'}, {'id': 54, 'text': '清明节'}, {'id': 55, 'text': '端午节'}, {'id': 56, 'text': '七夕节'}, {'id': 57, 'text': '中秋节'}, {'id': 58, 'text': '重阳节'}, {'id': 59, 'text': '忧国忧民'}, {'id': 60, 'text': '咏史怀古'}, {'id': 61, 'text': '宋词精选'}, {'id': 62, 'text': '小学古诗'}, {'id': 63, 'text': '初中古诗'}, {'id': 64, 'text': '高中古诗'}, {'id': 65, 'text': '小学文言文'}, {'id': 66, 'text': '初中文言文'}, {'id': 67, 'text': '高中文言文'}, {'id': 68, 'text': '古诗十九首'}, {'id': 69, 'text': '唐诗三百首'}, {'id': 70, 'text': '宋词三百首'}, {'id': 71, 'text': '古文观止'}],
}

export default PoemTagPage;
