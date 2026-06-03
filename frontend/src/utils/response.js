export const RESULT_CODE = {
  SUCCESS: "SUCCESS",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  BUSINESS_ERROR: "BUSINESS_ERROR",
  SYSTEM_ERROR: "SYSTEM_ERROR",
};

/**
 * 成功判定
 */
export const isSuccess = (res) => {
  return res?.resultCode === RESULT_CODE.SUCCESS;
};

/**
 * バリデーションエラー判定
 */
export const isValidationError = (res) => {
  return res?.resultCode === RESULT_CODE.VALIDATION_ERROR;
};

/**
 * 業務エラー判定
 */
export const isBusinessError = (res) => {
  return res?.resultCode === RESULT_CODE.BUSINESS_ERROR;
};

/**
 * システムエラー判定
 */
export const isSystemError = (res) => {
  return res?.resultCode === RESULT_CODE.SYSTEM_ERROR;
};

/**
 * メッセージ取得（安全に）
 */
export const getMessage = (res) => {
  return res?.message || "";
};

/**
 * データ取得（安全に）
 */
export const getData = (res) => {
  return res?.data || null;
};