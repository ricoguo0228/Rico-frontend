// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addChat POST /api/chat/add */
export async function addChatUsingPost(body: API.ChatAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/chat/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteChart POST /api/chat/delete */
export async function deleteChartUsingPost1(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/chat/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** editChart POST /api/chat/edit */
export async function editChartUsingPost1(
  body: API.ChartEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/chat/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** ChatWithAi POST /api/chat/gen */
export async function chatWithAiUsingPost(
  body: API.ChatAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseHistory_>('/api/chat/gen', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** ChatWithAiAsyncMq POST /api/chat/gen/async/mq */
export async function chatWithAiAsyncMqUsingPost(
  body: API.ChatAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseHistory_>('/api/chat/gen/async/mq', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getChartById GET /api/chat/get */
export async function getChartByIdUsingGet1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChartByIdUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseHistory_>('/api/chat/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listHistoriesByPage POST /api/chat/list/page */
export async function listHistoriesByPageUsingPost(
  body: API.ChatQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageHistory_>('/api/chat/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listMyChartByPage POST /api/chat/my/list/page */
export async function listMyChartByPageUsingPost1(
  body: API.ChatQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageHistory_>('/api/chat/my/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateChart POST /api/chat/update */
export async function updateChartUsingPost1(
  body: API.ChartUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/chat/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
