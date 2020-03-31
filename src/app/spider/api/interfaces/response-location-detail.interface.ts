export interface IResponseLocationDetail<T> {
  readonly data: [
    {
      readonly result_type: string;
      readonly result_object: T;
    },
  ];
  readonly partial_content: boolean;
}
