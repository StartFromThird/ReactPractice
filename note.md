# 安装

npx create-react-app my-app  
React Devtools

# 父传子

父：`<Square value={i} />`

```javascript
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }
}
```

子：{this.props.value}

```javascript
class Square extends React.Component {
  render() {
    return <button className="square">{this.props.value}</button>;
  }
}
```

# 组件

- 子类的构造函数，必须以 super(props) 开头

- 调用 setState 时，React 都会自动更新其子组件

设置私有 data

```javascript
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }
```

修改：

```javascript
this.setState({ value: "X" });
```

# 不可变性

- 不直接在数据上修改可以追溯并复用旧的 state。
- 帮助我们在 React 中创建 pure components。我们可以很轻松的确定不可变数据是否发生了改变，从而确定何时对组件进行重新渲染。

# 函数组件

- 只包含一个 render 方法，并且不包含 state, 返回需要渲染的元素

```javascript
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
```

# 其他

- Array(9).fill(null)
