package com.baboya.tasks;

public class GenericApiResponse<T> {
  private T data;

  public GenericApiResponse(T data) {
    this.data = data;
  }

  public T getData() {
    return data;
  }
}
