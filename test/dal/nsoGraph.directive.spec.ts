//

import { test } from "ava";
import { sandbox } from "sinon";

//

import { fetchPackageInfosAsync } from "nso/dal";

//

test.beforeEach((t) => {
  t.context.sandbox = sandbox.create();
});

test.afterEach((t) => {
  t.context.sandbox.restore();
});

//

test("DAL > fetchPackageInfosAsync", async (t) => {
  const body = new Buffer("{ \"name\": \"foo\" }");
  const fetchResponse = Promise.resolve(new Response(body, {status: 200}))  ;
  t.context.sandbox.stub(global, "fetch").returns(fetchResponse);

  let response;
  try {
    response = await fetchPackageInfosAsync("foo");
  } catch (e) {
    t.ifError(e);
  }

  t.deepEqual(response, {name: "foo"});
});
