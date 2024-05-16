import { get, post, put, del, patch } from './https';

//User Panel

//Auth Api
export const apiUserLogin = (params: any): Promise<any> => { return post('/login', params) };
export const apiUserLogout = (): Promise<any> => { return get('/logout') };
export const apiUserSignUp = (params: any): Promise<any> => { return post('/signup', params) };
export const apiUserForgetPassword = (params: any): Promise<any> => { return post('/forgot-password', params) };
export const apiUserResetSendLink = (params: any): Promise<any> => { return get('/reset-link-email', params) };

//Bot Api
export const apiCreateBot = (params: any): Promise<any> => { return post('/settings', params) };

//Calandar
export const apiGetCalanderStatus = (): Promise<any> => { return get('/calendar/connect/status') };
export const apiGoogleCalanderConnection = (params: any): Promise<any> => { return post('/calendar/connect/google', params) };
export const apiMicrosoftTeamsConnection = (params: any): Promise<any> => { return post('/microsoft/token/callback', params) };
export const apiGetCalanderSetting = (): Promise<any> => { return get('/calendar-setting') };
export const apiUpdateCalanderSetting = (params: any): Promise<any> => { return patch('/calendar-setting/update', params) };

//Chat To Call Api
export const apiCreateChatToCall = (params: any): Promise<any> => { return post('/chat-call', params) };
export const apiGetChatToCall = (id: any): Promise<any> => { return get('/chat-call', id) };

//Dashboard Api
export const apiGetDashboardData = (): Promise<any> => { return get('/dashboard') };

//Folder Api
export const apiCreateFolder = (params: any): Promise<any> => { return post('/folders', params) };
export const apiGetFolders = (params: any): Promise<any> => { return get('/folders',params) };
export const apiUpdateFolder = (id: number,params: any): Promise<any> => { return patch(`/folders/update/?id=${id}`, params) };

//Meeting Api
export const apiGetUpcomingMeeting = (params: any): Promise<any> => { return get('/meeting',params) };
export const apiGetRecordedMeeting = (params: any): Promise<any> => { return get('/meeting',params) };
export const apiCreateMeeting = (params: any): Promise<any> => { return post('/meeting', params) };
export const apiUpdateMeeting = (params: any): Promise<any> => { return put('/meeting/update', params) };
export const apiShareMeeting = (params: any): Promise<any> => { return post('/share-folder', params) };
export const apiGetMeetingDetail = (id: any): Promise<any> => { return get('/meeting-detail', id) };
export const apiDeleteMeeting = (id: any): Promise<any> => { return del(`/meeting/${id}`) };
export const apiCreateNote = (params: any): Promise<any> => { return post('/notes', params) };

//Quick Question Api
export const apiCreateQuickQuestion = (params: any): Promise<any> => { return post('/quick-question', params) };
export const apiGetQuickQuestion = (params: any): Promise<any> => { return get('/quick-question',params) };
export const apiUpdateQuickQuestion = (id: number,params: any): Promise<any> => { return patch(`/quick-question/update/?id=${id}`, params) };
export const apiDeleteQuickQuestion = (id: any): Promise<any> => { return del(`/quick-question/${id}`) };


//Admin Panel

//Auth Api
export const apiAdminLogin = (params: any): Promise<any> => { return post('/login', params) };
export const apiAdminLogout = (): Promise<any> => { return get('/logout') };

//Users Api
export const apiAdminGetUsers = (params: any): Promise<any> => { return get('admin/user',params) };
export const apiAdminCreateUser = (params: any): Promise<any> => { return post('admin/user', params) };
export const apiAdminUpdateUser = (params: any): Promise<any> => { return put('admin/user/update', params) };
export const apiAdminDeleteUsers = (id: any): Promise<any> => { return del(`admin/user/${id}`) };