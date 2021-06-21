import React, { Component } from 'react';
import { Spin, Alert } from 'antd';
import { Offline, Online } from 'react-detect-offline';
import List from '../list';
import './app.css';
import 'antd/dist/antd.css';
import SearchMovies from '../service/SearchMovies';

export default class App extends Component {
  state = {
    dataBase: [],
    loading: true,
    error: false,
  };

  search = new SearchMovies();

  constructor() {
    super();
    this.Fun();
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  onLoaded = (dataBase) => {
    this.setState({ dataBase, loading: false });
  };

  Fun = () => {
    this.search
      .getSearch('return')
      .then((dataBase) => dataBase.results)
      .then(this.onLoaded)
      .catch(this.onError);
  };

  render() {
    const { dataBase, loading, error } = this.state;

    const hasDate = !(loading || error);
    const errorMessage = error ? <Alert message="Ошибка запроса!" type="error" /> : null;
    const load = loading ? (
      <div className="center">
        <Spin size="large" tip="Loading..." />
      </div>
    ) : null;
    const content = hasDate ? <List data={dataBase} /> : null;

    return (
      <div>
        <Online>
          {errorMessage}
          {load}
          {content}
        </Online>
        <Offline>
          <Alert message="Отсутствует подключение к интернету" type="warning" />
        </Offline>
      </div>
    );
  }
}
