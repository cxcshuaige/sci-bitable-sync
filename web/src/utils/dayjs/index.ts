import dayjs from "dayjs";

export function formatDate(v: string | number, f?: string) {
    return dayjs(v).format(f || "YYYY-MM-DD HH:mm:ss");
}
