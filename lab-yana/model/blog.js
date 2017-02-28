'use strict';

const randomID = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('blog:blog');
const storage = require('../lib/storage.js');

const Blog = module.exports = function(name, content) {
  debug('note construct');
  if (!name) throw createError(400, 'name expected');
  if (!content) throw createError(400, 'content expected');

  this.id = randomID.v1();
  this.name = name;
  this.content = content;
};

Blog.createBlog = function(_blog) {
  debug('createBlog');
  try {
    let blog = new Blog(_blog.name, _blog.content);
    return storage.createItem('blog', blog);
  } catch(err) {
    return Promise.reject(createError(400, err.message));
  }
};

Blog.fetchBlog = function(id) {
  debug('fetchBlog');
  return storage.fetchItem('blog', id);
};

Blog.deleteBlog = function(id) {
  debug('deleteItem');
  return storage.deleteItem('blog', id);
};

Blog.updateBlog = function(_blog) {
  debug('updateBlog');
  try {
    let blog = new Blog(_blog.name, _blog.content);
    console.log('new blog object', blog);
    blog.id = _blog.id;
    console.log('after changing id', blog);
    return storage.createItem('blog', blog);
  } catch(err) {
    return Promise.reject(createError(400, err.message));
  }
};

Blog.fetchBlogList = function() {
  debug('fetchList');
  return storage.fetchList('blog');
};
