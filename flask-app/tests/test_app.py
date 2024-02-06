#!/usr/bin/env python
# coding: utf-8

__author__ = "Dhanunjaya Elluri"
__mail__ = "dhanunjayet@gmail.com"

import pytest

from flask_app import create_app


@pytest.fixture
def app():
    app = create_app()
    return app


@pytest.fixture
def client(app):
    return app.test_client()


def test_index(client):
    response = client.get("/")
    assert response.data == b"Index Page"


def test_hello_world(client):
    response = client.get("/helloworld")
    assert response.data == b"Hello, World!"
