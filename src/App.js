import React, { Component } from 'react';
import Course from './Course';

const api =
  'https://hiskio.com/api/v1/courses/professions?type=all&level=all&sort=latest&profession_id=2';

class App extends Component {
  state = {
    courses: [],
    next: null,
    loading: true,
  };
  componentDidMount() {
    this.fetchData(api);
    window.addEventListener('scroll', this.onScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }
  onScroll = () => {
    const { next, loading } = this.state;
    if (loading) return;
    if (!next) return;
    if (
      window.scrollY + window.innerHeight >=
      document.body.scrollHeight - 100
    ) {
      this.fetchData(next);
    }
  };
  fetchData = (url) => {
    this.setState({
      loading: true,
    });
    fetch(url)
      .then((rs) => rs.json())
      .then((data) => {
        this.setState({
          courses: [...this.state.courses, ...data.courses],
          next: data.paginate.next_page_url,
          loading: false,
        });
      });
  };
  render() {
    const { courses } = this.state;
    return (
      <div>
        {courses.map((course) => (
          <Course key={course.id} {...course} />
        ))}
      </div>
    );
  }
}

export default App;
