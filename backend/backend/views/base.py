class FrontendError(Exception):
    '''因为前端错误行为导致的异常'''

    def __init__(self, msg):
        super().__init__(self)  # 初始化父类
        self.msg = msg + " It could be caused by a frontend error."

    def __str__(self):
        return self.msg


def allow_acess(response):
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "*"
    return response
