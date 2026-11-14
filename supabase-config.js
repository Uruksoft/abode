// ============================================================
// إعدادات الاتصال بسيرفر Supabase (دُگّان - DAGGAN)
// تم دمج الرابط والمفتاح العام المخصص للواجهة الأمامية
// ============================================================

// المتغيرات الرئيسية
const SUPABASE_URL = "https://bxbyfqulupnfgmicinmp.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_qGD4mB8dNbs7S5HivsV3LA_oH9gaS-D";

// توافقية إضافية لضمان عمل باقي الملفات إذا كانت تستخدم الحروف الصغيرة
const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_ANON_KEY;

// التحقق من إدخال الإعدادات وتهيئة العميل
function isSupabaseConfigured() {
    return (
        typeof SUPABASE_URL === "string" &&
        SUPABASE_URL.startsWith("https://") &&
        !SUPABASE_URL.includes("YOUR_PROJECT_ID") &&
        typeof SUPABASE_ANON_KEY === "string" &&
        SUPABASE_ANON_KEY.length > 20 &&
        !SUPABASE_ANON_KEY.includes("YOUR_SUPABASE_ANON_KEY")
    );
}

let supabaseClient = null;
if (window.supabase && isSupabaseConfigured()) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}