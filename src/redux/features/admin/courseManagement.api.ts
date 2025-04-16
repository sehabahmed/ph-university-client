import { TQueryParam } from "../../../constants/global";
import { TResponseRedux, TSemesterRegistration } from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRegisteredSemesters: builder.query({
          query: (args) => {
            const params = new URLSearchParams();

            if (args) {

              args.forEach((item: TQueryParam) => {
                params.append(item.name, item.value as string);
              });
            }

            return {
              url: "/semester-registrations",
              method: "GET",
              params: params,
            };
          },
          transformResponse: (response: TResponseRedux<TSemesterRegistration[]>) => {
            return {
              data: response.data,
              meta: response.meta,
            };
          },
        }),
    addSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddSemesterRegistrationMutation, useGetAllRegisteredSemestersQuery } = courseManagementApi;
