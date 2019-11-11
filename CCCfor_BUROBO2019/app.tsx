'use strict';//厳格モード使用

declare var require: any
//Reactモジュール使用
var React = require('react');
var ReactDOM = require('react-dom');

//タイトルDOM-自動クロック付き
class Title extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        this.setState({
            date: new Date()
        });
    }
    render() {
        return (
            <div>
                <h1>制御指令コンソール</h1>
                <p>{this.state.date.toString()}</p>
            </div>
        );
    }
}

//FEP描画DOM
function FEP() {
    return (
        <div>
            <p>FEP通信</p>
            <p>操作側: {"接続"}</p>
            <a>固有アドレス: {"208"}</a>
            <p>コマンド手動入力 </p>
            <button>@RST</button>
            <button>@ARG</button>
            <button>@TBN{"198"}{"004"}</button>
            <input type="text"></input>
            <button>送信</button>
            <p>機体側: {"接続"}</p>
            <a>固有アドレス: {"198"}</a>
            <textarea></textarea>
        </div>
    );
}
//メイン描画DOM
function Main(props) {
    return (
        <div>
            <Title />
            <FEP />
        </div>
    );
}
//Reactのレンダー
ReactDOM.render(
    <Main />,
    document.getElementById('root')
);