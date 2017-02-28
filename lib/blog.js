'use strict';
// GENERATES RAND ID#
const uuid = require('node-uuid');
// ALLOWS YOU TO CREATE HTTP ERRORS
const createError = require('http-errors');
// HELPS YOU TO DEBUG BLOG JS
const debug = require('debug')('blog:blog.js');


const Blog = module.exports = function(name, content) {
  debug('blog constructor');

  if (!name) throw createError(400, 'expected name');
  if (!content) throw createError(400, 'expected content');

  this.id = uuid.v1();
  this.name = name;
  this.content = content;
};

Blog.createBlog = function(_blog) {
  debug('createBlog');

  try {
    let blog = new Blog(_blog.name, _blog.content);
    return storage.createItem('blog', blog);
  } catch (err) {
    return Promise.reject(err);
  }
};

Blog.fetchBlog = function(id) {
  debug('fetch blog');
  return storage.fetchItem('blog', id);
};
