export class regex {
    static email='^[a-zA-Z0-9._%+-]+@[a-zZ-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
    static nameWithSpace='.*\\S.*[a-zA-z0-9 ]';
    static nameWithoutSpace='.*\\S.*[a-zA-z0-9]';
    static linkedInUrl='http(s)?:\/\/([\w]+\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?';
    static websiteUrl='^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$';
}