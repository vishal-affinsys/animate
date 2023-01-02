const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

class AuthenticationBuilder {
  constructor(authentication = null) {
    this.header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authentication: authentication,
    };
  }
}

class BodyBuilder extends AuthenticationBuilder {
  constructor(body = null, authentication = null) {
    super(authentication);
    this.options = {
      header: this.header,
      body: body !== null ? JSON.stringify(body) : null,
    };
  }
}

class MethodBuilder extends BodyBuilder {
  constructor(body = null, authentication = null, method) {
    super(body, authentication);
    this.options = {...this.options, method: method};
  }
}

class BuildOptions extends MethodBuilder {
  constructor(body = null, authentication = null, method) {
    super(body, authentication, method);
    this.options = this.options;
  }
}

class RequestBuilder extends BuildOptions {
  constructor({url, method, authentication = null, body = null}) {
    super(body, authentication, method);
    this.request = {
      url: url,
      options: this.options,
    };
  }
  async sendRequest() {
    const promise = await new Promise(async (resolve, reject) => {
      return fetch(this.request.url, this.options)
        .then(res =>
          res
            .json()
            .then(data => resolve({res, data, message: 'success'}))
            .catch(e => {
              resolve({res, data: null, message: `failed: ${e}`});
            }),
        )
        .catch(e => {
          resolve({res: {status: null}, data: null, message: `failed: ${e}`});
        });
    });
    console.log(JSON.stringify(this.request, null, 2));
    return new ResponseBuilder({
      request: this.request,
      response: {
        body: promise.res,
        data: promise.data,
      },
      status: {
        error: promise.res.status !== 200,
        message: promise.message,
        code: promise.res.status,
      },
    });
  }
}

class ResponseBuilder {
  constructor({request, response, status}) {
    this.request = {
      url: request.url,
      options: request.options,
    };
    this.response = {body: response.body, data: response.data};
    this.status = {
      error: status.error,
      message: status.message,
      code: status.code,
    };
  }
  getUsersData() {
    return this.response.data.users.map(ele => ({
      id: ele.id,
      fullName: `${ele.firstName} ${ele.lastName}`,
      avatar: ele.image,
      email: ele.email,
      phone: ele.phone,
      age: ele.age,
      gender: ele.gender,
      userName: ele.username,
    }));
  }
}

export const getUserData = async () => {
  const resBuild = new RequestBuilder({
    url: 'https://dummyjson.com/users',
    method: Method.GET,
  });
  const res = (await resBuild.sendRequest()).getUsersData();
  await updateUser();
  return res;
};

export const createUser = async () => {
  const create = new RequestBuilder({
    url: 'https://dummy.restapiexample.com/api/v1/create',
    method: Method.POST,
    body: {name: 'test', salary: '123', age: '23'},
  });
  const res = await create.sendRequest();
  return res;
};

export const updateUser = async () => {
  const create = new RequestBuilder({
    url: 'https://dummy.restapiexample.com/api/v1/employees',
    method: Method.GET,
  });
  const res = await create.sendRequest();

  return res;
};

export {RequestBuilder, ResponseBuilder};
