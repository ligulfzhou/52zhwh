import datetime
import logging

from functools import partial
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base, declared_attr
from sqlalchemy import Column, Integer, String
from sqlalchemy.sql import func
from sqlalchemy.orm import sessionmaker
from sqlalchemy.dialects.mysql import TIMESTAMP, DATETIME, INTEGER, VARCHAR, TINYINT, DECIMAL, TEXT, LONGTEXT
from sqlalchemy.sql.expression import func, desc, asc


def model2dict(model):
    if not model:
        return {}
    return dict((col, getattr(model, col)) for col in model.__table__.columns.keys())


def model_to_dict(func):
    def wrap(*args, **kw):
        res = func(*args, **kw)
        return model2dict(res)
    return wrap


def models_to_list(func):
    def wrap(*args, **kw):
        try:
            res = func(*args, **kw)
        except Exception as e:
            return []
        return list(map(model2dict, res))
    return wrap


# engine = create_engine('mysql://ligulfzhou:AWSzhouligang153@zhoudbinstance.cj1hsrzhbkmc.ap-northeast-1.rds.amazonaws.com/joke?charset=utf8')
engine = create_engine('mysql://root:zhouligang@192.168.33.10/52meiju')
Session = sessionmaker(bind=engine)


class DeclareBase(object):

    __table_args__ = {'mysql_engine': 'InnoDB',
                      'mysql_charset': 'utf8'}
    id = Column(Integer, primary_key=True)
    # create_time = Column(DATETIME, nullable=False, server_default=func.now())
    # update_time = Column(TIMESTAMP, server_default=func.now(), server_onupdate=func.now())


Base = declarative_base(cls=DeclareBase)


class Meiju(Base):
    __tablename__ = 'meiju'

    img = Column(VARCHAR(128), server_default='', nullable=False)
    sentence = Column(TEXT)
    thumbs = Column(INTEGER(11), nullable=False, server_default='0')
    author_id = Column(INTEGER(11), nullable=False, server_default='0')
    source_id = Column(INTEGER(11), nullable=False, server_default='0')
    former_id = Column(INTEGER(11), nullable=False, server_default='0')


class MeijuTag(Base):
    __tablename__ = 'meiju_tag'

    tp = Column(TINYINT(1), nullable=False, server_default='0')  # 1/2/3 => author/ source/ tag
    name = Column(VARCHAR(32), nullable=False, server_default='')


class MeijuTags(Base):
    __tablename__ = 'tag_meiju'

    tag_id = Column(INTEGER(11), nullable=False, server_default='0')
    meiju_id = Column(INTEGER(11), nullable=False, server_default='0')


class APIModel:

    def __init__(self):
        self.session = Session()

    @model_to_dict
    def add_model(self, model=1, data={}):
        models = [Meiju, MeijuTag, MeijuTags]
        m = models[model](**data)
        self.session.add(m)
        self.session.commit()
        return m

    @model_to_dict
    def get_meiju(self, sentence):
        return self.session.query(Meiju).filter_by(sentence=sentence).scalar()

    @model_to_dict
    def get_meiju_fid(self, former_id):
        return self.session.query(Meiju).filter_by(former_id=former_id).scalar()

    @model_to_dict
    def get_tag(self, tp, name):
        # key = 'tag_%s_%s'%(tp, name)
        return self.session.query(MeijuTag).filter_by(tp=tp, name=name).scalar()

    @model_to_dict
    def get_meiju_tag(self, tag_id, meiju_id):
        return self.session.query(MeijuTags).filter_by(tag_id=tag_id, meiju_id=meiju_id).scalar()


api = APIModel()


if __name__ == '__main__':
    Base.metadata.create_all(engine, checkfirst=True)

