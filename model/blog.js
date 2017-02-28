'use strict';
// GENERATES RAND ID#
const uuid = require('node-uuid');
// ALLOWS YOU TO CREATE HTTP ERRORS
const createError = require('http-errors');
// HELPS YOU TO DEBUG BLOG JS
const debug = require('debug')('blog:blog.js');
const storage = require('../lib/storage.js');

const Blog = module.exports = function(title, content) {
  debug('blog constructor');

  if (!title) throw createError(400, 'expected title');
  if (!content) throw createError(400, 'expected content');
// these are properties of blog constructor
  this.id = uuid.v1();
  this.title = title;
  this.content = content;
};

Blog.createBlog = function(_blog) {
  debug('createBlog');

  try {
    let blog = new Blog(_blog.title, _blog.content);
    return storage.createItem('blog', blog);
  } catch (err) {
    return Promise.reject(err);
  }
};

Blog.fetchBlog = function(id) {
  debug('fetch blog');
  return storage.fetchItem('blog', id);
};
