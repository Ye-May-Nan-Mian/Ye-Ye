from react import source

# 如果指定文件不存在， path_for 会抛出 IOError 异常
react_js = source.path_for('react.min.js')
