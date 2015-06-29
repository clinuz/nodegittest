#!/usr/bin/env node

'use strict';

var
	path = require('path');

var
	Git = require('nodegit'),
	Checkout = Git.Checkout,
	Repository = Git.Repository;

var
	open = Repository.open,
	repo;

open(process.cwd())
	.then(function (_repo) {
		repo = _repo;
		return repo.getReference('origin/dev');
	})
	.then(function (ref) {
		return repo.setHead(ref.name(), repo.defaultSignature(), 'set head to ' + ref.target());
	})
	.then(function () {
		return Checkout.head(repo, {checkoutStrategy: Checkout.STRATEGY.FORCE})
	})
	.then(function () {
		console.log('done');
	})
.done();