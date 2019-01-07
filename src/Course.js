import React, { Component } from 'react';
import style from './Course.module.css';

class Course extends Component {
  render() {
    const { title, cover, teachers } = this.props;
    return (
      <div className={style.course}>
        <div
          className={style.cover}
          style={{
            backgroundImage: `url('${cover}')`,
          }}
        />
        <div className={style.info}>
          <div className={style.title}>{title}</div>
          {teachers.map((teacher) => (
            <label className={style.teacher}>{teacher.username}</label>
          ))}
        </div>
      </div>
    );
  }
}

export default Course;
